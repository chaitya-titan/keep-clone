import React, { useEffect, useState } from "react";
import { Button, IconButton, Avatar } from "@mui/material";
import HighlightIcon from "@mui/icons-material/Highlight";
import { useRecoilState, useRecoilValue } from "recoil";
import { landingState } from "../atoms/authState";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { authState } from "../atoms/authState";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const [landing, setLanding] = useRecoilState(landingState);
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3001/api/picture", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPicture(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const auth = useRecoilValue(authState);

  return (
    <header
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      {auth ? (
        <IconButton>
          {picture.length > 0 ? (
            <Avatar alt="Remy Sharp" src={picture} />
          ) : (
            <AccountCircleRoundedIcon />
          )}
        </IconButton>
      ) : (
        <Button
          color="inherit"
          sx={{
            color: "white",

            "&:hover": {
              color: "black",
            },
          }}
          onClick={() => {
            setLanding("login");
            navigate("/");
          }}
        >
          Login
        </Button>
      )}
    </header>
  );
}

export default Header;
