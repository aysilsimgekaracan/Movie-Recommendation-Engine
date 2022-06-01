import {
  Card,
  CardMedia,
  Typography,
  Rating,
  IconButton,
  ButtonBase,
  Box,
  Modal,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useContext, useState } from "react";
import MovieDetailModal from "./MovieDetailModal";
import { AuthContext } from "../Auth";

function MovieCard({
  key,
  width = 200,
  setLikedMovies,
  movie,
  likedMovies,
  isLikeButtonDisabled = false,
}) {
  // const [isLiked, setIsLiked] = useState(
  //   likedMovies.includes(movie) ? true : false
  // );

  // useEffect(() => {
  //   if (isLiked) {
  //     setLikedMovies((arr) => [...arr, movie]);
  //   } else {
  //     setLikedMovies((arr) => [...arr].filter((el) => el.id !== movie.id));
  //   }
  // }, [isLiked, movie, setLikedMovies]);

  const { currentUser } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card key={key} sx={[styles.mainCard, { width: width }]}>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles.modalMainBox}>
            {/* Title */}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {movie.title ? movie.title : movie.name}
            </Typography>
            <Box sx={styles.modalContentBox}>
              {/* Right Side */}
              <Box sx={{ marginRight: 5 }}>
                <CardMedia
                  component="img"
                  src={"https://image.tmdb.org/t/p/780" + movie.poster_path}
                  height="%100"
                />
                <Typography sx={{ mt: 2 }}>
                  Release Date: {movie.release_date}
                </Typography>

                <Rating
                  value={movie.vote_average / 2}
                  readOnly
                  precision={0.5}
                  size="small"
                />

                <Button
                  variant="contained"
                  endIcon={<FavoriteIcon />}
                  disabled={!currentUser}
                >
                  {currentUser ? "Like" : "Please Login"}
                </Button>
              </Box>

              {/* Left Side */}
              <Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {movie.overview}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>

      {/* <MovieDetailModal
        movie={movie}
        open={isOpen}
        onClose={setIsOpen(false)}
      /> */}
      <ButtonBase onClick={handleOpen}>
        <div style={{ position: "relative" }}>
          <CardMedia
            component="img"
            src={"https://image.tmdb.org/t/p/w780" + movie.poster_path}
            height="%100"
          />
          {/* <IconButton
          onClick={() => setIsLiked(!isLiked)}
          style={{ position: "absolute", top: 2, right: 2 }}
          aria-label="like movie"
          color={isLiked ? "error" : "default"}
          disabled={isLikeButtonDisabled}
        >
          <FavoriteIcon />
        </IconButton> */}
          <div style={styles.bottomBackground}>
            <Typography style={styles.text} variant="h7" gutterBottom>
              {movie.title ? movie.title : movie.name}
            </Typography>
            <Rating
              style={styles.rating}
              value={movie.vote_average / 2}
              readOnly
              precision={0.5}
              size="small"
            />
          </div>
        </div>
      </ButtonBase>
    </Card>
  );
}

let styles = {
  mainCard: {
    margin: 1,
    minWidth: 200,
    minHeight: 300,
  },
  bottomBackground: {
    position: "absolute",
    backgroundColor: "rgba(52, 52, 52, 0.6)",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 50,
    maxHeight: 70,
  },
  text: {
    color: "white",
    marginLeft: 10,
    bottom: 20,
  },
  rating: {
    borderWidth: 10,
    borderColor: "yellow",
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  modalMainBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  modalContentBox: {
    justifyContent: "spaceBetween",
    flexDirection: "row",
    display: "flex",
  },
};

export default MovieCard;
