import { Card, CardMedia, Typography, Rating, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";

function MovieCard({
  key,
  width = 200,
  setLikedMovies,
  movie,
  likedMovies,
  isLikeButtonDisabled = false,
}) {
  const [isLiked, setIsLiked] = useState(
    likedMovies.includes(movie) ? true : false
  );

  useEffect(() => {
    if (isLiked) {
      setLikedMovies((arr) => [...arr, movie]);
    } else {
      console.log("çok çalıştım");
      setLikedMovies((arr) => [...arr].filter((el) => el.id !== movie.id));
    }
  }, [isLiked, movie, setLikedMovies]);

  return (
    <Card
      key={key}
      sx={{
        margin: 1,
        width,
        minWidth: 200,
        minHeight: 300,
      }}
    >
      <div style={{ position: "relative" }}>
        <CardMedia
          component="img"
          src={"https://image.tmdb.org/t/p/w780" + movie.poster_path}
          height="%100"
        />
        <IconButton
          onClick={() => setIsLiked(!isLiked)}
          style={{ position: "absolute", top: 2, right: 2 }}
          aria-label="like movie"
          color={isLiked ? "error" : "default"}
          disabled={isLikeButtonDisabled}
        >
          <FavoriteIcon />
        </IconButton>
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
    </Card>
  );
}

let styles = {
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
};

export default MovieCard;
