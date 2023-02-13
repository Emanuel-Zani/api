const { Router } = require("express");

const GenresRoute = require("./genresRoute");
const VideogamesRoute = require("./gamesRoute");
const VideogameIDRoute = require("./gameRoute");
const VideogamePost = require("./postGameRoute");
const {validateGame} = require("../middleware/validatePost")

const router = Router();


router.use("/videogames", VideogamesRoute);
router.use("/genres", GenresRoute);
router.use("/videogame", VideogameIDRoute);
router.use("/videogames", validateGame ,VideogamePost);

module.exports = router;
