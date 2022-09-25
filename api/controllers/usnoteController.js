const mongoose = require("mongoose");
const Note = require("../models/usnoteModel");

// get all notes

const getNotes = async (req, res) => {
  const user_id = req.user._id;

  //only  find notes specific to the unique user id . user_id
  const notes = await Note.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

//get single  noites

const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

// create  a new notes
const createNote = async (req, res) => {
  const { title, usnote } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!usnote) {
    emptyFields.push("usnote");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add documeetns to db
  try {
    // add unique id to each notes
    const user_id = req.user._id;
    const note = await Note.create({ title, usnote, user_id });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a notes
const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

// update a notes
const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Notes" });
  }

  const note = await Note.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!note) {
    return res.status(400).json({ error: "No such Notes" });
  }

  res.status(200).json(note);
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
};
