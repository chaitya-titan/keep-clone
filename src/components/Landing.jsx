import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import SignUp from "./SignUp";
import Login from "./Login";

const Landing = () => {
  const [langingType, setLandingType] = useState("signup");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "10%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "white",
          width: "500px",
          //   height: "50vh",
          borderRadius: "20px",
          border: "1px solid #ccc",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        {langingType === "signup" ? (
          <SignUp setLandingType={setLandingType} />
        ) : (
          <Login setLandingType={setLandingType} />
        )}
      </Box>
    </Box>
  );
};

export default Landing;
