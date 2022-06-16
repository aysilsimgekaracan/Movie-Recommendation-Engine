import {
  Card,
  CardMedia,
  Typography,
  Rating,
  ButtonBase,
  Box,
  Modal,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../Auth";
import {
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../base";

function MovieCard({
  key,
  width = 200,
  movie,
  customMinHeight = 200,
  genres = [],
}) {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Seçilen film likelanmış mı
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const unsubhandleListener = onSnapshot(
        doc(db, "users", currentUser.uid),
        (doc) => {
          if (doc.data().likes.includes(movie.id)) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
          // console.log(doc.data().likes);
        }
      );

      return unsubhandleListener;
    }
  }, [currentUser, setIsLiked]);

  const likeButonClicked = () => {
    if (isLiked) {
      // dislike the movie
      handleDislike(currentUser.uid, movie.id);
    } else {
      // like the movie
      handleLike(currentUser.uid, movie.id);
    }
  };

  const handleLike = useCallback(async (uid, movieId) => {
    try {
      await setDoc(
        doc(db, "users", uid),
        {
          likes: arrayUnion(movieId),
        },
        { merge: true }
      );
    } catch (error) {
      alert(error);
    }
  });

  const handleDislike = useCallback(async (uid, movieId) => {
    try {
      await setDoc(
        doc(db, "users", uid),
        {
          likes: arrayRemove(movieId),
        },
        { merge: true }
      );
    } catch (error) {
      alert(error);
    }
  });

  return (
    <Card
      key={key}
      sx={[styles.mainCard, { width: width, minWidth: customMinHeight }]}
    >
      <div>
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
              {/* Left Side */}
              <Box sx={{ marginRight: 5 }}>
                <CardMedia
                  component="img"
                  src={"https://image.tmdb.org/t/p/780" + movie.poster_path}
                  height="%100"
                />
                <Typography sx={{ mt: 2 }}>
                  Release Date: {movie.release_date}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Genres: {genres.join(" ")}
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
                  onClick={likeButonClicked}
                >
                  {currentUser ? (isLiked ? "Unlike" : "Like") : "Please Login"}
                </Button>
              </Box>

              {/* Right Side */}
              <Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {movie.overview}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>

      <ButtonBase onClick={handleOpen}>
        <Card style={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            src={"https://image.tmdb.org/t/p/w780" + movie.poster_path}
            width="100%"
            height={width + 100}
          />
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
        </Card>
      </ButtonBase>
    </Card>
  );
}

let styles = {
  mainCard: {
    margin: 1,
    minHeight: 200,
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
