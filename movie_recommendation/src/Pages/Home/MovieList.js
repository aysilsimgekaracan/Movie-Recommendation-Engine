import React, { useEffect } from "react";
import { Paper, Box, Button, Typography, Modal } from "@mui/material";
import MovieCard from "../../Components/MovieCard";
import SearchBar from "../../Components/SearchBar";
import { ReactiveList, SearchBox } from "@appbaseio/reactivesearch";

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
    console.log(filteredMovies);
  }, [selectedGenres, setSelectedGenres, results, setFilteredMovies]);

  return (
    <Box sx={styles.mainBoxSx}>
      <SearchBox
        componentId="mainSearch"
        dataField={["original_title", "original_title.search"]}
        categoryField="genres.keyword"
        className="search-bar"
        queryFormat="and"
        placeholder="Search for movies..."
        iconPosition="left"
        autosuggest={true}
        filterLabel="search"
        enableRecentSuggestions={true}
        enablePopularSuggestions={true}
        enablePredictiveSuggestions={true}
        popularSuggestionsConfig={{
          size: 3,
          minHits: 2,
          minChars: 4,
        }}
        recentSuggestionsConfig={{
          size: 3,
          minChars: 4,
        }}
        index="movies-demo-app"
        size={10}
        innerClass={{ list: "list-class" }}
      />
      <ReactiveList
        defaultQuery={() => ({ track_total_hits: true })}
        componentId="results"
        dataField={[
          { field: "original_title", weight: 3 },
          { field: "original_title.search", weight: 2 },
        ]}
        react={{
          and: ["mainSearch", "genres-list"],
        }}
        pagination={true}
        className="Result_card"
        paginationAt="bottom"
        pages={5}
        size={12}
        Loader="Loading..."
        noResults="No results were found..."
        innerClass={{
          title: "result-title",
          listItem: "result-item",
          list: "list-container",
          sortOptions: "sort-options",
          resultStats: "result-stats",
          resultsInfo: "result-list-info",
          poweredBy: "powered-by",
        }}
      >
        {({ data }) => (
          <ReactiveList.ResultCardsWrapper style={{ margin: "8px 0 0" }}>
            {data.map((item) => (
              <MovieCard
                key={item.id}
                movie={item}
                // width={1 / 4}
                likedMovies={likedMovies}
              />
            ))}
          </ReactiveList.ResultCardsWrapper>
        )}
      </ReactiveList>

      {/* <SearchBar />

      <Paper sx={styles.moviePaper}>
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
      </Paper> */}
    </Box>
  );
}

let styles = {
  mainBoxSx: {
    width: "80%",
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
