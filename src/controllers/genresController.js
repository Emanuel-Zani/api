const axios = require("axios");

const { API_KEY } = process.env;

const getGenres = async () => {
  try {
    const getGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`,{
          headers:{
            "accept-encoding":"*",
          }
        }
    );
    const genres = getGenres.data.results?.map((el) => el.name);
    console.log(genres);
    return genres;
    
  } catch (error) {
    return { error: "Not found." };
  }
};

module.exports = getGenres;
