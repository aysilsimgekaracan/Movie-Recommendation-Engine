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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);

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

// import React, { useCallback } from "react";
// import app from "../../base";
// import { getAuth, signOut } from "firebase/auth";

// const Home = ({ history }) => {
//   const auth = getAuth(app);

//   const handleSignOut = useCallback(
//     async (event) => {
//       event.preventDefault();

//       try {
//         await signOut(auth)
//           .then(() => {
//             // Sign-out successful.
//             alert("Sign-out successful");
//           })
//           .catch((error) => {
//             // An error happened.
//             alert(error);
//           });
//       } catch (error) {
//         alert(error);
//       }
//     },
//     [history]
//   );

//   return (
//     <>
//       <h1>Home</h1>
//       <button onClick={handleSignOut}>Sign out</button>
//     </>
//   );
// };

// export default Home;
