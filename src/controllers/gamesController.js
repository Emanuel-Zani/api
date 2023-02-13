const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const getApiGames = async () => {
  let page = 1;

  let listGames = [];

  //Trae información de cada pagina de la API
  while (page < 6) {
    let apiGames = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`,
      {
        headers: {
          "accept-encoding": "*",
        },
      }
    );

    listGames.push(apiGames);

    page++;
  }

  //Mapear información
  listGames = (await Promise.all(listGames)).map((el) =>
    el.data.results.map((game) => {
      return {
        id: game.id,
        image: game.background_image,
        name: game.name,
        rating: game.rating,
        description: game.description_raw,
        released: game.released,
        platforms: game.platforms.map((game) => game.platform.name),
        genres: game.genres.map((game) => game.name),
      };
    })
  );

  //Concantear informacion de cada pagina de la API
  let gameConcat = [];

  listGames.map((g) => {
    gameConcat = gameConcat.concat(g);
  });

  return gameConcat;
};

const getDbGames = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [], },
    },
  })
};


const getAllGames = async () => {
  const apiGames = await getApiGames();
  const dbGames = await getDbGames();
  
  const infoTotal = apiGames.concat(dbGames); 
  return infoTotal;
};

module.exports = {
  getAllGames,
  getDbGames,
};
