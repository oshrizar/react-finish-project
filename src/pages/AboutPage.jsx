import React from "react";
import { Typography, Box, Button } from "@mui/material";
import COLORS from "../colors/COLORS";
import logoOfWeb from "../assets/imgs/logoOfWeb.png";
import pillsPic from "../assets/imgs/cardDefImg.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const AboutPage = () => {
  const navigate = useNavigate();
  const sxForTypography = {
    color: COLORS.TEXT1,
    mb: 4,
    transition: "all 0.5s ease-in-out",
    ":hover": { transform: "scale(1.1)" },
  };
  const handleExploreClick = () => {
    navigate(ROUTES.SHOP);
  };
  return (
    <Box
      sx={{
        textAlign: "center",
        maxWidth: { xs: "90vw", sm: "500px" },
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" component="h1" sx={sxForTypography}>
        We are Electro Master
      </Typography>
      <img
        src={logoOfWeb}
        alt='Logo Of The Website Written "Electro Master"'
        style={{
          borderRadius: "25px",
          marginBottom: "1.3rem",
        }}
      />
      <Typography variant="body1" sx={sxForTypography}>
        Electro Master is a leading retailer and distributor specializing in
        electric and digital products. With a commitment to delivering
        cutting-edge technology and top-notch customer service, Electro Master
        has become a trusted name in the industry. The company was founded on
        the principles of innovation, quality, and convenience, making it a
        one-stop shop for all things electronic.
      </Typography>
      <Typography variant="body1" sx={sxForTypography}>
        In a world that thrives on technological innovation, staying ahead of
        the curve has never been more important. Welcome to Electro Master
        Company, where we bring you an unrivaled selection of digital and
        electric devices of all kinds. As a company dedicated to serving your
        tech needs, we take pride in being your go-to destination for the latest
        and greatest in the world of electronics.
      </Typography>
      <Typography variant="body1" sx={sxForTypography}>
        In a world that thrives on technological innovation, staying ahead of
        the curve has never been more important. Welcome to Electro Master
        Company, where we bring you an unrivaled selection of digital and
        electric devices of all kinds. As a company dedicated to serving your
        tech needs, we take pride in being your go-to destination for the latest
        and greatest in the world of electronics.
      </Typography>
      <Typography variant="body1" sx={sxForTypography}>
        Our product catalog is a treasure trove of innovation, featuring a wide
        array of digital and electric devices that span various categories.
        Whether you're in search of smartphones, laptops, tablets, gaming
        consoles, smart home gadgets, wearable technology, or anything in
        between, Electro Master Company has got you covered. We collaborate with
        renowned brands and manufacturers to ensure that our offerings are of
        the highest quality and come with the latest technological advancements.
      </Typography>
      <Typography variant="body1">
        In a world where technology is the driving force of progress, Electro
        Master Company stands as your trusted partner in acquiring the latest
        and greatest digital and electric devices. With a diverse product range,
        cutting-edge technology, exceptional customer service, competitive
        prices, and a commitment to excellence, we invite you to explore the
        world of innovation with us.
      </Typography>
      <Typography
        variant="h2"
        component="h3"
        style={{ marginTop: "4rem" }}
        sx={sxForTypography}
      >
        Why You Are Still Reading?!
      </Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          sx={{ color: COLORS.INVERTEDFROMMAIN }}
        >
          What are you waiting for?
        </Typography>
        <img
          src={pillsPic}
          alt="Animated Pills"
          style={{ width: "15%", height: "15%", borderRadius: "10px" }}
        />
      </Box>
      <Button
        onClick={handleExploreClick}
        variant="contained"
        sx={{
          mt: "0.6rem",
          backgroundColor: COLORS.TEXT1,
          height: "90px",
          borderRadius: "15px",
          fontSize: "2rem",
        }}
      >
        Explore Our Products
      </Button>
    </Box>
  );
};

export default AboutPage;
