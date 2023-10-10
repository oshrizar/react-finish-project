import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import defPic from "../assets/imgs/cardDefImg.png";
import logoPic from "../assets/imgs/logoOfWeb.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import COLORS from "../colors/COLORS";

const Page404 = () => {
  const navigate = useNavigate();
  const handleReturnClick = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-around",
        justifyContent: "space-between",
        gap: "50px",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography
        component="h2"
        variant="h2"
        sx={{
          color: COLORS.INVERTEDFROMMAIN,
          fontWeight: "bold",
          letterSpacing: 10,
        }}
      >
        ERROR{" "}
        <Box component="span" sx={{ color: "red", fontWeight: "bolder" }}>
          404
        </Box>
        : Page Not Found
        <Button onClick={handleReturnClick} color="error" variant="outlined">
          404 Page - Click here to return to home page
        </Button>
      </Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Box
          component="img"
          id="left-pic"
          src={defPic}
          alt="the pills container default picture"
          sx={{
            width: "50%",
            borderRadius: "50px 0 0 50px",
            transition: "all 2s ease-in-out",
          }}
        />
        <Box
          id="right-pic"
          component="img"
          src={logoPic}
          alt="the logo"
          sx={{
            width: "50%",
            borderRadius: " 0 50px 50px 0",
            transition: "all 2s ease-in-out",
          }}
        />
      </Box>
    </Container>
  );
};

export default Page404;
