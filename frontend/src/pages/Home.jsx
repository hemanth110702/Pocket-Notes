import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useNotesContext } from "../context/NotesContext";
import NoteDetails from "../components/NoteDetails";
import CreateNote from "../components/CreateNote";

const Home = () => {
  const { notes, dispatch } = useNotesContext();
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      await apiClient
        .get("/api/notes")
        .then((response) => {
          console.log(response);
          dispatch({ type: "SET_NOTES", payload: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchNotes();
  }, []);

  const addNote = () => {
    setShowCreateNote(true);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={addNote}>New</button> <br />
      <input type="search" className="border-2 border-red-500 " />
      {notes && notes.map((note) => <NoteDetails note={note} />)}
      {showCreateNote && <CreateNote setShowCreateNote={setShowCreateNote} />}
    </div>
  );
};

export default Home;
