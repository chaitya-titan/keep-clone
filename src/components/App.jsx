import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import AllNotes from "./AllNotes";
import Header from "./Header";
import Footer from "./Footer";
import Landing from "./Landing";
import { Box } from "@mui/material";

function App() {
  return (
    <Box>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/notes/:username" element={<AllNotes />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Box>
  );
}

export default App;
