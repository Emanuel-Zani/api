const { Router } = require("express");
const { getAllGames } = require("../controllers/gamesController");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allGames = await getAllGames();

  try {
    if (name) {
      const gameByName = await allGames.filter((g) =>
        g.name.toLowerCase().includes(name)
      );
      gameByName.length
        ? res.status(200).send(gameByName)
        : res.status(404).send(`We don't have a game with that name.`);
    } else {
      res.status(200).json(allGames);
    }
  } catch (error) {
    res.status(404).send(`Not found.`);
  }
});

module.exports = router;
