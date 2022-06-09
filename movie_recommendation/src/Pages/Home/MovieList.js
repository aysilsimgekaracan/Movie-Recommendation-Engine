import React from "react";
import { Box } from "@mui/material";
import MovieCard from "../../Components/MovieCard";
import { ReactiveList, SearchBox } from "@appbaseio/reactivesearch";

function MovieList() {
  return (
    <Box sx={styles.mainBoxSx}>
      <SearchBox
        componentId="mainSearch"
        dataField={["original_title", "original_title.search"]}
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
        index="es-movie-recommendation"
        size={10}
        innerClass={{ list: "list-class" }}
        style={{
          marginBottom: 10,
          marginTop: 10,
          color: "black",
          width: "90%",
          marginLeft: "5%",
        }}
      />
      <ReactiveList
        defaultQuery={() => ({ track_total_hits: true })}
        componentId="results"
        dataField={[
          { field: "original_title", weight: 3 },
          { field: "original_title.search", weight: 2 },
        ]}
        react={{
          and: ["mainSearch", "list-1"],
        }}
        pagination={true}
        className="Result_card"
        pages={5}
        size={12}
        Loader="Loading..."
        noResults="No results were found..."
        sortOptions={[
          {
            dataField: "vote_count",
            sortBy: "desc",
            label: "Sort by vote-count(High to Low) \u00A0",
          },
          {
            dataField: "popularity",
            sortBy: "desc",
            label: "Sort by Popularity(High to Low)\u00A0 \u00A0",
          },
          {
            dataField: "vote_average",
            sortBy: "desc",
            label: "Sort by Ratings(High to Low) \u00A0",
          },
          {
            dataField: "original_title.keyword",
            sortBy: "asc",
            label: "Sort by Title(A-Z) \u00A0",
          },
        ]}
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
              <MovieCard key={item.id} movie={item} genres={item.genres} />
            ))}
          </ReactiveList.ResultCardsWrapper>
        )}
      </ReactiveList>
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
