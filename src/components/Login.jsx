import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

const Login = (props) => {
  const { setLandingType } = props;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = () => {
    setLandingType("signup");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (name === "" || password === "") {
      alert("Please fill in all fields");
      window.location.reload();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        mt: 3,
      }}
    >
      <Typography variant="h6" component="h6" gutterBottom>
        Please Login
      </Typography>
      <TextField
        sx={{
          width: "75%",
          mt: 2,
        }}
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={handleNameChange}
      />
      <TextField
        sx={{
          width: "75%",
          mt: 2,
        }}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        onChange={handlePasswordChange}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button
          sx={{
            mt: 2,
            mb: 4,
            mr: 2,
            background: "#f5ba13",
            "&:hover": {
              background: "#f5ba13",
            },
          }}
          onClick={handleSubmit}
          variant="contained"
        >
          Submit
        </Button>
        <Button
          sx={{
            mt: 2,
            mb: 4,
            background: "#f5ba13",
            "&:hover": {
              background: "#f5ba13",
            },
          }}
          variant="contained"
          onClick={handleSignUpClick}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
