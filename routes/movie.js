const router = require("express").Router();

const authorization = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const MovieController = require("../controllers/movie");

router.use(authentication);

router.get("/", MovieController.getMovies);
router.get("/popular", MovieController.getPopularMovies);
router.post("/", MovieController.createMovie);
router.put("/:id", authorization, MovieController.editMovie);
router.patch("/:id/show", authorization, MovieController.updateShow);
router.delete("/:id", authorization, MovieController.removeMovie);

module.exports = router;
