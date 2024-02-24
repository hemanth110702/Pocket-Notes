import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useNotesContext } from "../context/NotesContext";
import NoteDetails from "../components/NoteDetails";
import CreateNote from "../components/CreateNote";
import DisplayNote from "../components/DisplayNote";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuthContext();
  const { notes, dispatch } = useNotesContext();
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [displayNote, setDisplayNote] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      await apiClient
        .get("/api/notes", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          dispatch({ type: "SET_NOTES", payload: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchNotes();
  }, [dispatch]);

  const addNote = () => {
    setShowCreateNote(true);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={addNote}>New</button> <br />
      <input type="search" className="border-2 border-red-500 " />
      {notes &&
        notes.map((note, index) => (
          <NoteDetails
            key={index}
            note={note}
            setDisplayNote={setDisplayNote}
          />
        ))}
      {showCreateNote && <CreateNote setShowCreateNote={setShowCreateNote} />}
      {displayNote && (
        <DisplayNote
          displayNote={displayNote}
          setDisplayNote={setDisplayNote}
        />
      )}
    </div>
  );
};

export default Home;
