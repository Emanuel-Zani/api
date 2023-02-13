const axios = require("axios");
const { API_KEY } = process.env;

const getGameById = async (id) => {
  try {
    let gameById = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
      {
        headers: {
          "accept-encoding": "*",
        },
      }
    );
  
    gameById = gameById.data;
    gameById = {
      id: gameById.id,
      image: gameById.background_image,
      name: gameById.name,
      description: gameById.description_raw,
      genres: gameById.genres.map((el) => el.name),
      released: gameById.released,
      rating: gameById.rating,
      platforms: gameById.platforms.map((el) => el.platform.name),
    }
    return gameById;
  } catch (error) {
    return 'Not found.';
  }
};

module.exports = {
  getGameById,
};
