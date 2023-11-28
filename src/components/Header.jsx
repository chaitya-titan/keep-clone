import React from "react";
import { Button } from "@mui/material";
import HighlightIcon from "@mui/icons-material/Highlight";
import { useRecoilState } from "recoil";
import { landingState } from "../atoms/authState";

function Header() {
  const [landing, setLanding] = useRecoilState(landingState);

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
        }}
      >
        Login
      </Button>
    </header>
  );
}

export default Header;
