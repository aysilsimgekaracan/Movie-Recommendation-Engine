import "./App.css";
import React, { useEffect, useState } from "react";
import { Paper, TextField, Box } from "@mui/material";
import * as movieData from "./movies.json";
import * as genreData from "./genres.json";
import MovieCard from "./Components/MovieCard";
import Header from "./Sections/Header";
import Recommendations from "./Sections/Recommendations";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import UsersLikes from "./Sections/UsersLikes";
import Filters from "./Sections/Filters";

const { results } = movieData;
const { genres } = genreData;

function App() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(results);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [likedMovies, setLikedMovies] = useState([]);

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

  useEffect(() => {
    console.log("login/logout");
  }, [isLoggedIn, setIsLoggedIn]);

  return (
    <div className="App">
      <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      <div className="App-content">
        <Recommendations
          results={results}
          isLoggedIn={isLoggedIn}
          likedMovies={likedMovies}
          setLikedMovies={setLikedMovies}
        />
        <div className="App-movieSection">
          <Filters genres={genres} setSelectedGenres={setSelectedGenres} />
          {/* <MovieList
            filteredMovies={filteredMovies}
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
            isLoggedIn={isLoggedIn}
            results={results}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            setFilteredMovies={setFilteredMovies}
          /> */}
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
          <UsersLikes
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
