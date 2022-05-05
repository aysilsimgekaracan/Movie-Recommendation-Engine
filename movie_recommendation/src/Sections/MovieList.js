import React, { useEffect } from "react";
import { Paper, Box } from "@mui/material";
import MovieCard from "../Components/MovieCard";
import SearchBar from "../Components/SearchBar";

function MovieList({
  filteredMovies,
  likedMovies,
  setLikedMovies,
  isLoggedIn,
  results,
  selectedGenres,
  setSelectedGenres,
  setFilteredMovies,
}) {
  useEffect(() => {
    if (selectedGenres.length === 0) {
      setFilteredMovies(results);
    } else {
      setFilteredMovies(
        results.filter((movie) => {
          var includes = false;
          movie.genre_ids.map((genre_id) => {
            if (selectedGenres.includes(genre_id)) {
              includes = true;
            }
            return;
          });
          return includes;
        })
      );
    }
  }, [selectedGenres, setSelectedGenres, results, setFilteredMovies]);

  return (
    <Box sx={styles.mainBoxSx}>
      <SearchBar />

      <Paper sx={styles.moviePaper}>
        {/* Filtered movies will be listed: */}
        {filteredMovies.map((result) => {
          return (
            <MovieCard
              key={result.id}
              movie={result}
              width={1 / 4}
              likedMovies={likedMovies}
              setLikedMovies={setLikedMovies}
              isLikeButtonDisabled={!isLoggedIn}
            />
          );
        })}
      </Paper>
    </Box>
  );
}

let styles = {
  mainBoxSx: {
    width: 1 / 2,
    background:
      "linear-gradient(#d91a1a, #b41c1c, #8f1d1e, #6b1f20, #462022, #212224)",
    borderRadius: 3,
    margin: 1,
  },
  moviePaper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 5,
    marginRight: 2,
    marginLeft: 2,
    background: "transparent",
    border: 0,
    minHeight: 500,
  },
};

export default MovieList;
