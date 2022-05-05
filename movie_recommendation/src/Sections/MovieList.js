import React, { useEffect } from "react";
import { Paper, TextField, Box } from "@mui/material";
import MovieCard from "../Components/MovieCard";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

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
    <Box
      sx={{
        width: 1 / 2,
        background:
          "linear-gradient(#d91a1a, #b41c1c, #8f1d1e, #6b1f20, #462022, #212224)",
        borderRadius: 3,
        margin: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: "80%",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          margin: "auto",
          marginTop: 2,
        }}
        autoComplete="off"
        component="form"
      >
        <TextField
          id="searchbar"
          label="Search"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ input: { color: "white" } }}
        />
      </Box>

      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: 5,
          marginRight: 2,
          marginLeft: 2,
          background: "transparent",
          border: 0,
          minHeight: 500,
        }}
      >
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

export default MovieList();
