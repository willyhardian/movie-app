const router = require("express").Router();

const authorization = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const MovieController = require("../controllers/movie");

const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.use(authentication);

router.get("/", MovieController.getMovies);
router.get("/popular", MovieController.getPopularMovies);
router.get("/:id", MovieController.getMovie);
router.post("/", MovieController.createMovie);
router.put("/:id", authorization, MovieController.editMovie);
router.patch("/:id/img", authorization, upload.single("image"), MovieController.updateImgUrl);
router.patch("/:id/show", authorization, MovieController.updateShow);
router.delete("/:id", authorization, MovieController.removeMovie);

module.exports = router;
