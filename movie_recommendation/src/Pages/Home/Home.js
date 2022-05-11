import "../../App.css";
import React, { useEffect, useState } from "react";
import * as movieData from "../../movies.json";
import * as genreData from "../../genres.json";
import Header from "./Header";
import Recommendations from "./Recommendations";
import UsersLikes from "./UsersLikes";
import Filters from "./Filters";
import MovieList from "./MovieList";

const { results } = movieData;
const { genres } = genreData;

function Home() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(results);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [likedMovies, setLikedMovies] = useState([]);

  // useEffect(() => {
  //   if (selectedGenres.length === 0) {
  //     setFilteredMovies(results);
  //   } else {
  //     setFilteredMovies(
  //       results.filter((movie) => {
  //         var includes = false;
  //         movie.genre_ids.map((genre_id) => {
  //           if (selectedGenres.includes(genre_id)) {
  //             includes = true;
  //           }
  //           return;
  //         });
  //         return includes;
  //       })
  //     );
  //   }
  // }, [selectedGenres, setSelectedGenres]);

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
          <MovieList
            filteredMovies={filteredMovies}
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
            isLoggedIn={isLoggedIn}
            results={results}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            setFilteredMovies={setFilteredMovies}
          />
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

export default Home;
