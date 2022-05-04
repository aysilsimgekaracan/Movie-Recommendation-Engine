import "./App.css";
import React, { useEffect, useState } from "react";
import { Paper, Typography, TextField, Box, Grid } from "@mui/material";
import * as movieData from "./movies.json";
import * as genreData from "./genres.json";
import MovieCard from "./Components/MovieCard";
import Header from "./Sections/Header";
import Recommendations from "./Sections/Recommendations";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterButton from "./Components/FilterButton";

const { results } = movieData;
const { genres } = genreData;

function App() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(results);

  function newMovie() {
    var newOnes = [];
    results.map((movie) => {
      movie.genre_ids.map((genre_id) => {
        if (selectedGenres.includes(genre_id)) {
          newOnes.push(movie);
          return;
        }
      });
    });
  }

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
  }, [selectedGenres, setSelectedGenres]);

  return (
    <div className="App">
      <Header />
      <div className="App-content">
        <Recommendations results={results} />
        <div className="App-movieSection">
          <Paper
            sx={{
              width: 1 / 4,
              marginTop: 10,
              maxHeight: 1000,
              backgroundColor: "#212224",
            }}
          >
            <Typography variant="h5" gutterBottom style={{ color: "white" }}>
              Filters
            </Typography>
            <Grid container rowSpacing={1}>
              {genres.map((genre) => {
                return (
                  <FilterButton
                    id={genre.id}
                    name={genre.name}
                    onClick={setSelectedGenres}
                  />
                );
              })}
            </Grid>
          </Paper>
          <Box
            sx={{
              width: 1 / 2,
              background:
                "linear-gradient(#d91a1a, #b41c1c, #8f1d1e, #6b1f20, #462022, #212224)",
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
                    width={1 / 4}
                    posterPath={result.poster_path}
                    title={result.title ? result.title : result.name}
                    voteAverage={result.vote_average}
                  />
                );
              })}
            </Paper>
          </Box>
          <Paper
            sx={{
              width: 1 / 4,
              marginTop: 10,
              maxHeight: 1000,
              backgroundColor: "#212224",
            }}
          >
            <Typography variant="h3" gutterBottom style={{ color: "white" }}>
              User's likes goes here.
            </Typography>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default App;
