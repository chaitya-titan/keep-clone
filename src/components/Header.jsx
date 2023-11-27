import React from "react";
import { Button } from "@mui/material";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header() {
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
      >
        Login
      </Button>
    </header>
  );
}

export default Header;
