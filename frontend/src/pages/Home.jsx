import React, { useEffect } from "react";
import apiClient from "../services/apiClient";
import { useNotesContext } from "../context/NotesContext";

const Home = () => {
  const { notes, dispatch } = useNotesContext();

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

  return (
    <div>
      <h1>Home</h1>
      <input type="search" className="border-2 border-red-500 " />
      {notes &&
        notes.map((note) => (
          <div className="border-2 border-red-500 m-2">
            <p>title: {note.title}</p>
            <p>content: {note.content}</p>
            <p>Created: {note.createdAt}</p>
            <p>Last Updated: {note.updatedAt}</p>
          </div>
        ))}
    </div>
  );
};

export default Home;
