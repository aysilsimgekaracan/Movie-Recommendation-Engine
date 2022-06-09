import pd from "pandas";
import { NearestNeighbors } from "sklearn/neighbors";
import { csr_matrix } from "scipy/sparse";

function engine() {
  var mat_movies_users,
    model_knn,
    movie_data,
    movie_names,
    movies_users,
    ratings_data,
    trend;
  ratings_data = pd.read_csv("./the-movies-dataset/ratings_small.csv");
  ratings_data = ratings_data.drop("timestamp", {
    axis: 1,
  });
  movie_names = pd.read_csv("./the-movies-dataset/movies_metadata.csv");
  movie_names = movie_names[["title", "genres"]];
  movie_data = pd.concat([ratings_data, movie_names], {
    axis: 1,
  });
  trend = new pd.DataFrame(movie_data.groupby("title")["rating"].mean());
  trend["total number of ratings"] = new pd.DataFrame(
    movie_data.groupby("title")["rating"].count()
  );
  movie_data.groupby("title")["rating"].mean().sort_values({
    ascending: false,
  });
  movies_users = ratings_data
    .pivot({
      index: ["userId"],
      columns: ["movieId"],
      values: "rating",
    })
    .fillna(0);
  mat_movies_users = csr_matrix(movies_users.values);
  model_knn = new NearestNeighbors({
    metric: "cosine",
    algorithm: "brute",
    n_neighbors: 20,
    n_jobs: -1,
  });
  model_knn.fit(mat_movies_users);
}

export default engine;
