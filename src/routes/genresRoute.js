const { Router } = require("express");
const { Videogame, Genre } = require("../db");

const getGenres = require("../controllers/genresController");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const genreGames = await getGenres();

    genreGames.forEach((g) => {
      Genre.findOrCreate({
        where: {
          name: g,
        },
      });
    });
  
    const allGenres = await Genre.findAll();
    res.status(200).json(allGenres);
  } catch (error) {
    res.status(404).send(`Information not found.`);
  }
});

module.exports = router;
