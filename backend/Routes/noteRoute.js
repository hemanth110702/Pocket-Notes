const express = require("express");
const {
  createNote,
  getNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controller/notesController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);
router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
