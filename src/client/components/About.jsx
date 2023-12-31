import React from "react";
import Kitties from "../assets/kitties.png";
import Miffy from "../assets/miffy.png";
import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { ParallaxProvider } from 'react-scroll-parallax'
import { Parallax } from 'react-scroll-parallax'

const About = () => {
  return (
    <Box className="about-section">
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <img src={Kitties} alt="Kitties" className="leftImg"/>
        </Grid>
        <Grid item xs={6} alignItems="center">
          <Typography
            variant="h2"
            style={{
              fontSize: "20px",
              fontWeight: "500",
              marginBottom: "20px",
            }}
          >
            About Us
          </Typography>
          <ParallaxProvider>
          <Parallax translateX={['-100px', '300px']}>
          <Typography variant="body1" style={{ marginBottom: "20px" }}>
            At Lizards Plushies, we believe that everyone deserves a special
            plushie to love and cherish. That's why we handcraft our plushies
            with care and attention to detail, using only the finest materials.
            Our plushies are made in the United States, and we are proud to
            support American-made products. We believe that handmade plushies
            are special because they are made with love. Each plushie is unique,
            and no two are exactly alike. When you purchase a handmade plushie
            from Lizards Plushies, you are not just buying a toy; you are buying
            a piece of art. Our plushies are made with a variety of materials,
            including soft and cuddly plush fabrics, hypoallergenic fiberfill,
            and embroidered details. We use high-quality materials to ensure
            that our plushies are durable and safe for children of all ages.
          </Typography>
          </Parallax>
          </ParallaxProvider>
          <Link href="/" style={{ textAlign: "center" }}>
            about this company
          </Link>
        </Grid>
      </Grid>
    </Box>
    
  );
};

export default About;
