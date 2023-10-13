import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../assets/Banner.png";
import About from "./About";
import { Box, Container, Typography } from "@mui/material";
import Footer from "./Footer"; // Import your Footer component

export default function Home() {
  return (
    <Box style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box className="banner">
        <img src={Banner} alt="Banner" />
      </Box>
      <Container maxWidth="md" style={{ flex: 1 }}>
        <Typography variant="h1" style={{ fontSize: "26px", fontWeight: "700" }}>
          <br />
          Welcome to Lizards Plushies, Your one-stop shop for everything Plushie!
        </Typography>
        <br />
        <About />
      </Container>
      <Footer />
    </Box>
  );
}
