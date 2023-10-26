const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Get Notes deta from header GET "/api/notes/fetchallnotes",
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;

// Create a new note POST "/api/notes/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body(
      "description",
      "description must have a minimum of 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNotes = await notes.save();
      res.json(saveNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// update existing Note "/api/notes/updatenote" Login req
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // create new note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (title) {
      newNote.tag = tag;
    }
    // Find note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});
// Delete existing Note "/api/notes/deletenote" Login req
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find note to delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not Found");
    }
    // Allow to delete if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "Note has been Deleted ", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
