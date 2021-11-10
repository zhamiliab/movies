import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

class ModalPage extends React.Component {
    constructor() {
        super();
        this.state = {
            imageUrl: "https://image.tmdb.org/t/p/w185",
            isOpen: true
        }
    }
    //   const [open, setOpen] = React.useState(false);
    //   const handleOpen = () => setOpen(true);
    //   const handleClose = () => setOpen(false);
    handleOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
        this.props.handleModalToggle(this.state.isOpen)

    }
    render() {
        const modalData = this.props.modalData
        const url = this.state.imageUrl + modalData[0].profile_path
        console.log(this.props.modalData, "inside modal page")
        return (
            <div>
                {/* <Button onClick={this.handleOpen}>Open modal</Button> */}
                <Modal
                    open={this.state.isOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div onClick={this.handleOpen} style={{ float: "right" }}>X</div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h5>{modalData[0].name}</h5>
                        </Typography>
                        <div>
                            <img src={url} alt="" />
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <h4>popularity rating: {modalData[0].popularity}</h4>
                                <div>

                                    {
                                        modalData[0].known_for.map(item => {
                                            // const knownFor = item.known_for

                                            return (

                                                <img style={{ width: "60px", height: "50px", margin: "5px" }} src={this.state.imageUrl + item.backdrop_path} alt="" />

                                            )


                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default ModalPage;
