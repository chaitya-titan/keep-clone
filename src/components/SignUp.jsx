import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { setLandingType } = props;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (name === "" || email === "" || password === "") {
      alert("Please fill in all fields");
      window.location.reload();
    }

    await axios
      .post("http://localhost:3001/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        console.log("User Created");
        alert("User Created, Please Login");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert("User Already Exists");
          window.location.reload();
        }
        console.error(err);
      });
  };

  const handleLoginClick = () => {
    setLandingType("login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        mt: 3,
      }}
    >
      <Typography variant="h6" component="h6" gutterBottom>
        Please Sign Up
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
        label="Email"
        variant="outlined"
        onChange={handleEmailChange}
      />
      <TextField
        sx={{
          width: "75%",
          mt: 2,
        }}
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
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
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
