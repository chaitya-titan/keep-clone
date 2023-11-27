import React, { useState } from "react";
import CreateArea from "./CreateArea";
import { useRecoilValue } from "recoil";
import Note from "./Note";
import { authState } from "../atoms/authState";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const auth = useRecoilValue(authState);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      {auth ? (
        <div>
          <CreateArea onAdd={addNote} />
          {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <h1>Please Login to View Notes</h1>
        </div>
      )}
    </div>
  );
};

export default AllNotes;
