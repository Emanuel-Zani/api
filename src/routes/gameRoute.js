const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const { getDbGames } = require("../controllers/gamesController");
const { getGameById } = require("../controllers/idGameController");
const router = Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;


  try {
    if (id.includes("-")) {
      const dbId = await getDbGames();
      const gameId = dbId.find((g) => g.id === id);
      res.status(200).json(gameId);
    } else {
      const idGame = await getGameById(id);
      res.status(200).json(idGame);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});



module.exports = router;
