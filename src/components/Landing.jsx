import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {};

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
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
