const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

const Notes = require("../models/Notes");

//ROUTE 1: Get all the notes using: GET "api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong!");
  }
});
//ROUTE 2: Add the notes using: POST "api/notes/addnote"
router.post(
  "/addnote",
  fetchuser,
  [body("title", "Title is required").isLength({ min: 1 })],
  async (req, res) => {
    try {
      //Check for errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //Add data if no error
      Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id,
      }).then((notes) => res.json(notes));
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Something went wrong!");
    }
  }
);

//ROUTE 3: Update notes using: PUT "api/notes/updatenote:id"

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //creating a new object
    const newnote = {};
    //store incoming data in object if exists in req
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    //find the note in DB
    let note = await Notes.findById(req.params.id);

    //If not found
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Match the id of user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.send({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong!");
  }
});

//ROUTE 4: Delete notes using: DELETE "api/notes/deletenote:id"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note in DB
    let note = await Notes.findById(req.params.id);

    //If not found
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Match the id of user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //update the note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.send("success");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("something went wrong!");
  }
});

module.exports = router;
