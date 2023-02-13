const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  let {
    name,
    image,
    description,
    released,
    rating,
    genres,
    platforms,
    createdInDb,
  } = req.body;

  let newGame = await Videogame.create({
    name,
    image,
    description,
    released,
    rating,
    platforms,
    createdInDb,
  });

  let genreDB = await Genre.findAll({
    where: { name: genres },
  });

  await newGame.addGenre(genreDB);

  res.status(200).json(newGame);
});

module.exports = router;
