import React from "react";
import { format } from "date-fns";

const NoteDetails = ({ note, setDisplayNote, displayNote }) => {
  const selectedNote = () => {
    setDisplayNote(note._id);
  };

  return (
    <div
      onClick={!displayNote ? selectedNote : undefined}
      className="group w-52 p-2 h-56 flex flex-col justify-between border-2 border-red-500 m-2 rounded-xl opacity-100 hover:cursor-pointer   transition duration-150 ease-out hover:ease-out hover:text-white hover:bg-red-400
      dark:bg-black dark:text-white dark:hover:bg-gray-400 dark:border-0"
    >
      <div className="uppercase text-xl line-clamp-2 font-bold">
        {note.title}
      </div>
      <div className="line-clamp-3 ">{note.content}</div>
      <div className="text-sm text-slate-400  font-semibold group-hover:text-slate-700">
        Updated: {format(new Date(note.updatedAt), "MMM dd, HH:mm")}
      </div>
    </div>
  );
};

export default NoteDetails;
