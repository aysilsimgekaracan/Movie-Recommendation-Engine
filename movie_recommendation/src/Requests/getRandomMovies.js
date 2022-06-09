var axios = require("axios");

function getRandomMovies(size = 5, seed = 10) {
  var data = JSON.stringify({
    size: 5,
    query: {
      function_score: {
        random_score: {
          seed: 10,
          field: "_seq_no",
        },
      },
    },
  });

  var config = {
    method: "post",
    url: "https://es-movie-recommendation-dfkcomj-arc.searchbase.io/es-movie-recommendation/_doc/_search",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Basic ODE3MTllY2Q5NTUyOmUwNmRiMDAxLWE2ZDgtNGNjMi1iYzQzLTljMTViMWMwYzk4Nw==3MTllY2Q5NTUyOmUwNmRiMDAxLWE2ZDgtNGNjMi1iYzQzLTljMTViMWMwYzk4Nw==",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default getRandomMovies();
