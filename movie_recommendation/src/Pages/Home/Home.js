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

function Home({ history }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="App">
      <Header isLoggedIn={currentUser ? true : false} />
      <div className="App-content">
        <ReactiveBase
          app={process.env.REACT_APP_APPBASE_ES_APP_NAME}
          url={process.env.REACT_APP_APPBASE_ES_CREDENTIAL_URL}
          enableAppbase
        >
          <Recommendations results={results} currentUser={currentUser} />
          <div className="App-movieSection">
            <Filters />
            <MovieList />
            <UsersLikes currentUser={currentUser} />
          </div>
        </ReactiveBase>
      </div>
    </div>
  );
}

export default Home;
