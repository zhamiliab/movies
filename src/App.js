import React from "react";
import { Spinner, Button } from "reactstrap"
import PageComponent from "./paginationForMovies"
import ModalPage from "./modalForMovie"
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
      modalClicked: false
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
  modal = (e) => {
    console.log(e, "if id is coming or not")
    let filtered = this.state.data.filter(item => item.id === e)
    this.setState({ modalData: filtered, modalClicked: true })
    console.log(filtered, "is filtered or not")
  }
  handleModalToggle = (status) => {
    this.setState({ modalClicked: !status })
  }
  render() {
    const { data, imageUrl, isLoading } = this.state
    console.log(this.state.modalClicked, "<<<clicked modal")
    return (
      <div className="App">
        <PageComponent changePage={this.changePage} />

        <div className="movies">
          {
            isLoading ? data.map(item => {
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