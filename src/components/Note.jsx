import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function Note(props) {
  const handleClick = () => {
    props.onDelete(props.id);
  };

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteRoundedIcon />
      </button>
    </div>
  );
}
