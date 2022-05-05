import { Typography } from "@mui/material";
import MovieCard from "../Components/MovieCard";

function Recommendations({ results, isLoggedIn, likedMovies, setLikedMovies }) {
  return (
    <div>
      <Typography
        sx={{
          color: "white",
          borderBottom: 0.4,
          borderColor: "white",
          width: "80%",
          textAlign: "left",
          margin: "auto",
        }}
        variant="h5"
      >
        {isLoggedIn ? "Recommendations Based On Your Likes" : "Trend Movies"}
      </Typography>
      <div
        className="App-recommendation"
        style={{
          flex: 1,
          width: "80%",
          padding: 10,
          margin: "auto",
        }}
      >
        {isLoggedIn
          ? results.slice(0, 2).map((result) => {
              return (
                <MovieCard
                  key={result.id}
                  movie={result}
                  setLikedMovies={setLikedMovies}
                  likedMovies={likedMovies}
                  isLikeButtonDisabled={!isLoggedIn}
                />
              );
            })
          : results.slice(0, 12).map((result) => {
              return (
                <MovieCard
                  key={result.id}
                  movie={result}
                  setLikedMovies={setLikedMovies}
                  likedMovies={likedMovies}
                  isLikeButtonDisabled={!isLoggedIn}
                />
              );
            })}
      </div>
    </div>
  );
}

export default Recommendations;
