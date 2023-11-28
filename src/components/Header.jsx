import React from "react";
import { Button, IconButton } from "@mui/material";
import HighlightIcon from "@mui/icons-material/Highlight";
import { useRecoilState, useRecoilValue } from "recoil";
import { landingState } from "../atoms/authState";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { authState } from "../atoms/authState";
import { Navigate, useNavigate } from "react-router-dom";

function Header() {
  const [landing, setLanding] = useRecoilState(landingState);
  const navigate = useNavigate();

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
          <AccountCircleRoundedIcon />
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
