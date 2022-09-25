const express = require("express");
const {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/usnoteController");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

//check  auth for all notes route
router.use(checkAuth);

// middleware that is specific to this router

// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

// router.get("/", (req, res) => {
//   res.send("Workout Home page");
// });

// GET all workouts
router.get("/", getNotes);

//GET a single workout
router.get("/:id", getNote);

// POST a new workout
router.post("/", createNote);

// DELETE a workout
router.delete("/:id", deleteNote);

// UPDATE a workout
router.patch("/:id", updateNote);

module.exports = router;
