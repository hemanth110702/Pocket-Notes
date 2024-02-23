const Joi = require("joi");
const mongoose = require("mongoose");
const Note = require("../model/noteModel");

const createNote = async (req, res) => {
  const { error: JoiError } = validateNoteInput(req.body);
  if (JoiError) return res.status(400).send(JoiError.details[0].message);

  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    return res.status(200).send(note);
  } catch (err) {
    console.log(err);
    return res.status(500).send("There was an server error creating note");
  }
};

const getNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid note ID");
  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).send("Note not found");
    return res.status(200).send(note);
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an server error in retrieving note");
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).send(notes);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("There was an server error in retrieving notes");
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid note ID");

  const { error: JoiError } = validateNoteInput(req.body);
  if (JoiError) return res.status(400).send(JoiError.details[0].message);

  const { title, content } = req.body;

  try {
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!note) return res.status(404).send("The note was not found");
    return res.status(200).send(note);
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an server error in updating note");
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid note ID");

  try {
    await Note.findByIdAndDelete(id);
    return res.status(200).send("The note was deleted");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("There was an server error in deleting the note");
  }
};

function validateNoteInput(data) {
  const joiSchema = Joi.object({
    title: Joi.string().min(3).max(65).required(),
    content: Joi.string().required(),
  });
  return joiSchema.validate(data);
}

module.exports = { createNote, getNote, getNotes, updateNote, deleteNote };
