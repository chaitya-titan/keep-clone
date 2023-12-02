import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { authState } from "../atoms/authState";

const Login = (props) => {
  const { setLandingType } = props;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

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
    axios
      .post("https://keep-clone-server.vercel.app/login", {
        name: name,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token;
          const name = res.data.name;
          localStorage.setItem("token", res.data.token);
          const str = "/notes/" + name;

          if (token) {
            setAuth(true);
            navigate(str);
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert("Incorrect Username or Password");
          window.location.reload();
        }
        console.error(err);
      });
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
        id="outlined-basic1"
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
