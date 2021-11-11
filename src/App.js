import React from "react";
import { Spinner, Button, InputGroup, Input, DropdownMenu, DropdownItem, Dropdown, DropdownToggle } from "reactstrap"
import PageComponent from "./paginationForMovies"
import ModalPage from "./modalForMovie"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./App.css"
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currentpage: 1,
      imageUrl: "https://image.tmdb.org/t/p/w185",
      isLoading: false,
      modalData: [],
      modalClicked: false,
      search: "",
      genderSelected: ""
    }
  }
  componentDidMount() {
    this.createApi()
  }

  createApi = async () => {
    const url = `https://api.themoviedb.org/3/person/popular?api_key=df8b08ecb436696fee41a00f8d87a540&language=en&page=${this.state.currentpage}`
    try {
      let data = await fetch(url)
      let res = await data.json()
      this.setState({
        data: res.results,
        isLoading: true,
      })
    } catch (err) {
      console.log(err)
    }
  }

  changePage = (e) => {
    // console.log(typeof e)
    this.setState({ currentpage: e }, () => {
      this.createApi()
    })
  }
  progressForward = (e) => {
    this.setState({ currentpage: e }, () => {
      this.createApi()
    })
  }
  modal = (e) => {
    // console.log(e, "if id is coming or not")
    let filtered = this.state.data.filter(item => item.id === e)
    this.setState({ modalData: filtered, modalClicked: true })
    // console.log(filtered, "is filtered or not")
  }
  handleModalToggle = (status) => {
    this.setState({ modalClicked: !status })
  }
  handleSearch = (e) => {
    this.setState({ search: e.target.value })
  }
  handleDropDown = (t) => {
    console.log(t.target.value, "<<<drop down")
    this.setState({ genderSelected: Number(t.target.value) })
  }
  render() {
    const { data, imageUrl, isLoading } = this.state
    console.log(this.state.genderSelected, "state dropdown")
    const filteredAfterSearch = data.filter(item => item.name.toLowerCase().includes(this.state.search.toLowerCase()))
    const filteredAfterDropDown = filteredAfterSearch.filter(item => {
      if (this.state.genderSelected) {
        return item.gender === this.state.genderSelected
      }
      return item
    })
    console.log(filteredAfterDropDown, "<<< filtered after drop")
    return (
      <div className="App">
        <PageComponent changePage={this.changePage} progressForward={this.progressForward} currentpage={this.state.currentpage} />
        <div style={{ margin: "10px" }}>
          <InputGroup>
            <Input onChange={this.handleSearch} value={this.state.search} placeholder="type to search..." />
          </InputGroup>
        </div>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value="asd"
            label="Age"
            onChange={this.handleDropDown}
          >
            <MenuItem value="">select to choose</MenuItem>
            <MenuItem value="2">male</MenuItem>
            <MenuItem value="1">female</MenuItem>
          </Select>
        </FormControl>
        <div className="movies">
          {
            isLoading ? filteredAfterDropDown.map(item => {
              const url = imageUrl + item.profile_path // "https://image.tmdb.org/t/p/w185/igxYDQBbTEdAqaJxaW6ffqswmUU.jpg"
              // console./log(Array.isArray(item.known_for), "<<<< known")
              let knownFor = item.known_for.map(title => title.title)
              // console.log(knownFor, "title or not")
              return (
                <div className="movie" onClick={() => this.modal(item.id)}>
                  <img className="images" src={url} alt="" />
                  <div className="name">{item.name}</div>
                  <div className="details">{knownFor.join(",")}</div>
                </div>
              )
            })
              :
              <Spinner />
          }
        </div>
        {this.state.modalClicked ? <ModalPage modalData={this.state.modalData} handleModalToggle={this.handleModalToggle} /> : ""}
      </div>
    )
  }
}

export default App;