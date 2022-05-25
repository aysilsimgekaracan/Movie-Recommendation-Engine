import "../../App.css";
import React, { useEffect, useState, useContext } from "react";
import * as movieData from "../../movies.json";
import * as genreData from "../../genres.json";
import Header from "./Header";
import Recommendations from "./Recommendations";
import UsersLikes from "./UsersLikes";
import Filters from "./Filters";
import MovieList from "./MovieList";
import { AuthContext } from "../../Auth";
import { ReactiveBase } from "@appbaseio/reactivesearch";

const { results } = movieData;
const { genres } = genreData;

function Home({ history }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(results);
  const [likedMovies, setLikedMovies] = useState([]);

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="App">
      <Header isLoggedIn={currentUser ? true : false} />
      <div className="App-content">
        <ReactiveBase
          app="movies-demo-app"
          url="https://81719ecd9552:e06db001-a6d8-4cc2-bc43-9c15b1c0c987@appbase-demo-ansible-abxiydt-arc.searchbase.io"
          enableAppbase
          theme={{
            typography: {
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: "16px",
            },
            colors: {
              backgroundColor: "#212121",
              primaryTextColor: "#fff",
              primaryColor: "#2196F3",
              titleColor: "#fff",
              alertColor: "#d9534f",
              borderColor: "#666",
            },
          }}
        >
          <Recommendations
            results={results}
            isLoggedIn={currentUser ? true : false}
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
          />
          <div className="App-movieSection">
            <Filters genres={genres} setSelectedGenres={setSelectedGenres} />
            <MovieList
              filteredMovies={filteredMovies}
              likedMovies={likedMovies}
              setLikedMovies={setLikedMovies}
              isLoggedIn={currentUser ? true : false}
              results={results}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              setFilteredMovies={setFilteredMovies}
            />
            {/* <UsersLikes
              likedMovies={likedMovies}
              setLikedMovies={setLikedMovies}
              isLoggedIn={currentUser ? true : false}
            /> */}
          </div>
        </ReactiveBase>
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
