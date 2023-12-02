import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authState";

export default function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [auth, setAuth] = useRecoilState(authState);

  const { setNotes, notes } = props;

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  function submitNote(event) {
    axios
      .post(
        "http://localhost:3001/api/addNotes",
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        const newNote = response.data;
        setTitle("");
        setContent("");
        setExpanded(false);
        setNotes([...notes, newNote]);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.removeItem("token");
          setAuth(false);
          alert("Session Expired, Please Login Again");
        }
        console.error(err);
      });

    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleTitleChange}
            value={title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleContentChange}
          value={content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
