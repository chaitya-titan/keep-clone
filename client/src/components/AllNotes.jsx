import React, { useEffect, useState } from "react";
import CreateArea from "./CreateArea";
import { useRecoilValue, useRecoilState } from "recoil";
import Note from "./Note";
import { authState } from "../atoms/authState";
import axios from "axios";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);

  const [auth, setAuth] = useRecoilState(authState);

  const token = localStorage.getItem("token");
  if (token) {
    setAuth(true);
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setAuth(false);
          localStorage.removeItem("token");
        }
        console.error(err);
      });
  }, []);

  return (
    <div>
      {auth ? (
        <div>
          <CreateArea setNotes={setNotes} notes={notes} />
          {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={noteItem.id}
                title={noteItem.title}
                content={noteItem.content}
                setNotes={setNotes}
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
