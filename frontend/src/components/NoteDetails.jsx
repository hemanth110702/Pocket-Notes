import React from "react";

const NoteDetails = ({ note, setDisplayNote }) => {
  const selectedNote = () => {
    setDisplayNote(note._id);
  };

  return (
    <div onClick={selectedNote} className="border-2 border-red-500 m-2">
      <p>title: {note.title}</p>
      <p>content: {note.content}</p>
      <p>Created: {note.createdAt}</p>
      <p>Last Updated: {note.updatedAt}</p>
    </div>
  );
};

export default NoteDetails;
