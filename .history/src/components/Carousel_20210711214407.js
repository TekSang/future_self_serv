import React, { useState, useEffect, useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { _getAllPhotos } from "../graphql_operations/queries";
import useWindowSize from "../hooks/useWindowSize";
import { makeStyles, Container, Backdrop, Modal, Fade } from "@material-ui/core";
import { Context } from "../context/contextActions";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function HomeCarousel(props) {
  const classes = useStyles();
  const { width } = useWindowSize();
  const {
    state: { event },
  } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchAllImages(event.id);
  }, []);

  async function fetchAllImages(eventId) {
    try {
      let { photos } = await _getAllPhotos({ eventId });

      if (photos) {
        let myPhotos = [];
        for (var i = 0; i < photos.length; i++) {
          let photo = photos[i];
          let signedUrl = await Storage.get(photo.link, {
            expires: 1800 * 2, //* 1 hour in seconds
          });
          photo.url = signedUrl;
          myPhotos.push(photo);
        }
        console.log(myPhotos);
        setPhotos(myPhotos);
      }
    } catch (error) {
      console.log("🚀 ~ file: PhotoUpload.js ~ line 75 ~ fetchAllImages ~ error", error);
    }
  }

  return !open ? (
    <Container maxWidth="lg">
      <Carousel
        autoFocus={true}
        infiniteLoop={true}
        interval={5000}
        autoPlay={true}
        dynamicHeight={true}
        showThumbs={false}
        emulateTouch={true}
      >
        {photos.map((p, i) => {
          return (
            <div key={p + i} onClick={handleOpen}>
              <img src={p} alt={"Photo " + i} width={width ? Math.round(width) : 600} />
            </div>
          );
        })}
      </Carousel>
    </Container>
  ) : (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Container maxWidth="lg">
          <Carousel
            autoFocus={true}
            infiniteLoop={true}
            interval={5000}
            autoPlay={true}
            dynamicHeight={true}
            showThumbs={false}
            emulateTouch={true}
          >
            {photos.map((p, i) => {
              return (
                <div key={p + i}>
                  <img src={p} alt={"Photo " + i} width={width ? Math.round(width) : 600} />
                </div>
              );
            })}
          </Carousel>
        </Container>
      </Fade>
    </Modal>
  );
}
