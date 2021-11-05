import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import useWindowSize from "../hooks/useWindowSize";
import { makeStyles, Container, Backdrop, Modal, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const searchTerms = [
  "wedding",
  "marriage",
  "marry",
  "married",
  "nuptials",
  "engagement",
  "proposal",
  "vows",
  "lovebirds",
  "first kiss",
];
export default function HomeCarousel(props) {
  const classes = useStyles();
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const photos = searchTerms.map((s) => `https://source.unsplash.com/featured/?${s}`);

  return !open ? (
    <Container>
      <Carousel
        autoFocus={true}
        infiniteLoop={true}
        interval={5000}
        autoPlay={true}
        dynamicHeight={true}
        width={width < 700 ? width * 0.85 : 700}
      >
        {photos.map((p, i) => {
          return (
            <div key={p + i} onClick={handleOpen}>
              <img src={p} alt={"Photo " + i} />
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
        <Container>
          <Carousel
            autoFocus={true}
            infiniteLoop={true}
            interval={5000}
            autoPlay={true}
            dynamicHeight={true}
            width={width < 700 ? width : 700}
          >
            {photos.map((p, i) => {
              return (
                <div key={p + i}>
                  <img src={p} alt={"Photo " + i} />
                </div>
              );
            })}
          </Carousel>
        </Container>
      </Fade>
    </Modal>
  );
}
