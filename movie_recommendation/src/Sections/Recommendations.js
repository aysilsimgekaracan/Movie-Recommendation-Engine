import { Typography } from "@mui/material";
import MovieCard from "../Components/MovieCard";

function Recommendations({ results }) {
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
        Recommendations Based On Your Likes
      </Typography>
      <div
        className="App-recommendation"
        style={{ flex: 1, width: "80%", padding: 10, margin: "auto" }}
      >
        {results.slice(0, 12).map((result) => {
          return (
            <MovieCard
              posterPath={result.poster_path}
              title={result.title}
              voteAverage={result.vote_average}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Recommendations;
