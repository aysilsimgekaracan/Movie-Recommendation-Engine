import "./App.css";
import React from "react";
import { Paper, Typography, Grid, Button } from "@mui/material";
import * as data from "./movies.json";
import MovieCard from "./Components/MovieCard";
import { Box } from "@mui/system";

const { results } = data;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography
          gutterBottom
          variant="h4"
          style={{ textAlign: "left", paddingLeft: 10, flex: 5 }}
        >
          Movie Recommendation
        </Typography>
        <Typography
          gutterBottom
          style={{ textAlign: "left", paddingLeft: 10, flex: 1 }}
        >
          Login
        </Typography>
        <Typography
          gutterBottom
          style={{ textAlign: "left", paddingLeft: 10, flex: 1 }}
        >
          Sign-up
        </Typography>
        <Typography
          gutterBottom
          style={{ textAlign: "left", paddingLeft: 10, flex: 1 }}
        >
          Profile
        </Typography>
      </header>
      <div className="App-content">
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

        <div className="App-movieSection">
          <Paper
            sx={{
              width: 1 / 4,
              marginTop: 10,
              maxHeight: 1000,
              backgroundColor: "#212224",
            }}
          >
            <Typography variant="h3" gutterBottom style={{ color: "white" }}>
              Filtering Options goes here
            </Typography>
          </Paper>
          <Paper
            sx={{
              width: 1 / 2,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginTop: 5,
              marginRight: 2,
              marginLeft: 2,
              background:
                "linear-gradient(#d91a1a, #b41c1c, #8f1d1e, #6b1f20, #462022, #212224)",
            }}
          >
            {results.map((result) => {
              return (
                <MovieCard
                  width={1 / 4}
                  posterPath={result.poster_path}
                  title={result.title}
                  voteAverage={result.vote_average}
                />
              );
            })}
          </Paper>
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
