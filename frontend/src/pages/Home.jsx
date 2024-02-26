import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useNotesContext } from "../context/NotesContext";
import NoteDetails from "../components/NoteDetails";
import CreateNote from "../components/CreateNote";
import DisplayNote from "../components/DisplayNote";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const Home = () => {
  const { user } = useAuthContext();
  const { notes, dispatch } = useNotesContext();
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [displayNote, setDisplayNote] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true); // Set loading state to true before making the API request
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
        })
        .finally(() => {
          setLoading(false); // Set loading state to false after the API request is completed
        });
    };
    fetchNotes();
  }, [dispatch, user.token]);

  const addNote = () => {
    setShowCreateNote(true);
  };

  useEffect(() => {
    if (search) {
      setFilteredNotes((_) =>
        notes.filter((note) =>
          note.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, notes]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center justify-center gap-2 pt-4">
        <input
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="py-2 px-4 rounded-full w-2/6 border-2 border-red-500 outline-none dark:border-slate-500"
        />
        <button
          className="px-4 py-2 rounded-2xl bg-blue-400 font-semibold hover:bg-blue-300
              transition duration-50 ease-in hover:ease-in"
          onClick={addNote}
        >
          New
        </button>{" "}
        <br />
      </div>
      <div className="flex flex-wrap justify-center items-center mt-6">
        {loading ? (
          <Loading />
        ) : search ? (
          filteredNotes &&
          filteredNotes.map((note, index) => (
            <NoteDetails
              key={index}
              note={note}
              displayNote={displayNote}
              setDisplayNote={setDisplayNote}
            />
          ))
        ) : (
          notes &&
          !search &&
          notes.map((note, index) => (
            <NoteDetails
              key={index}
              note={note}
              setDisplayNote={setDisplayNote}
            />
          ))
        )}
      </div>
      {!showCreateNote && !displayNote && (
        <button
          className="bg-blue-400 fixed bottom-5 right-5 font-bold text-2xl rounded-lg p-4 hover:bg-blue-300
            transition duration-50 ease-in hover:ease-in"
          onClick={addNote}
        >
          +
        </button>
      )}
      {showCreateNote && (
        <CreateNote
          setLoading={setLoading}
          setShowCreateNote={setShowCreateNote}
        />
      )}
      {displayNote && (
        <DisplayNote
          displayNote={displayNote}
          setDisplayNote={setDisplayNote}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default Home;
