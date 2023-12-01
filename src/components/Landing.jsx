import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import SignUp from "./SignUp";
import Login from "./Login";
import { useRecoilState } from "recoil";
import { landingState } from "../atoms/authState";
import GoogleButton from "react-google-button";
import { authState } from "../atoms/authState";

const Landing = () => {
  const [langingType, setLandingType] = useRecoilState(landingState);

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
          flexDirection: "column",
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
