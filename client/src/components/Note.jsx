import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authState";

export default function Note(props) {
  const { key, id, title, content, setNotes } = props;
  const [auth, setAuth] = useRecoilState(authState);

  const handleClick = () => {
    console.log(id);

    axios
      .post(
        "https://keep-clone-server.vercel.app/api/deleteNotes",
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setNotes(response.data);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.removeItem("token");
          setAuth(false);
          alert("Session Expired, Please Login Again");
        }
        console.error(err);
      });
  };

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleClick}>
        <DeleteRoundedIcon />
      </button>
    </div>
  );
}
