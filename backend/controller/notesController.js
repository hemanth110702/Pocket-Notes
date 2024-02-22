const createNote = (req, res) => {
  res.send("This is the post request to create Note");
};
const getNote = (req, res) => {
  res.send("This is the post request to get Note");
};
const getNotes = (req, res) => {
  res.send("This is the post request to get Notes");
};
const updateNote = (req, res) => {
  res.send("This is the post request to update Note");
};
const deleteNote = (req, res) => {
  res.send("This is the post request to delete Note");
};

module.exports = { createNote, getNote, getNotes, updateNote, deleteNote };
