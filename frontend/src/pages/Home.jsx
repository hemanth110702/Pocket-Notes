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
          setLoading(false); // Set loading state to false after the API request is completed
        })
        .catch((err) => {
          console.log(err);
          setLoading(false); // Set loading state to false if there's an error
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
      <div
        className="p-4 gap-2 grid auto-rows-max grid-cols-1 self-center items-center justify-items-center nssm:grid-cols-2 
            sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
      >
        {search && loading ? (
          <div role="status text-center">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          search &&
          filteredNotes &&
          filteredNotes.map((note, index) => (
            <NoteDetails
              key={index}
              note={note}
              displayNote={displayNote}
              setDisplayNote={setDisplayNote}
            />
          ))
        )}
        {!search && loading ? (
          <div role="status text-center">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
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
      {showCreateNote && <CreateNote setLoading={setLoading} setShowCreateNote={setShowCreateNote} />}
      {displayNote && (
        <DisplayNote
          displayNote={displayNote}
          setDisplayNote={setDisplayNote}
          setLoading={setLoading}
        />
      )}
      {!showCreateNote && !displayNote && (
        <button
          className="bg-blue-400 fixed bottom-5 right-5 font-bold text-2xl rounded-lg p-4 hover:bg-blue-300
            transition duration-50 ease-in hover:ease-in"
          onClick={addNote}
        >
          +
        </button>
      )}
    </div>
  );
};

export default Home;
