import React from "react";
import COLORS from "../colors/COLORS";
import logoPic from "../assets/imgs/logoOfWeb.png";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { Box, Button, Typography } from "@mui/material";

const Footer = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleContactClick = () => {
    scrollToTop();
    navigate(ROUTES.CONTACTUS);
  };
  const handleLogoClick = () => {
    scrollToTop();
    navigate(ROUTES.HOME);
  };
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: COLORS.MAIN,
        padding: "10px",
        textAlign: "center",
        display: "flex",
        gap: "2rem",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Box
        onClick={handleLogoClick}
        component="img"
        sx={{
          aspectRatio: "2/1",
          width: "10%",
          minWidth: "180px",
          minHeight: "95px",
          cursor: "pointer",
          transform: "skew(-10deg,0deg)",
          borderRadius: "50px",
          transition: "all 0.2s linear",
          ":hover": { transform: "none" },
        }}
        src={logoPic}
        alt="logo of web in the footer section"
      />
      <Typography style={{ color: COLORS.TEXT1 }}>
        © {new Date().getFullYear()} Electro Master Inc.
        <br />
        All Rights Reserved
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        onClick={
          loc && loc.pathname == ROUTES.CONTACTUS ? null : handleContactClick
        }
        sx={{
          padding: 3,
          borderRadius: "20px 0 20px 0",
          transition: "all 0.3s linear",
          cursor:
            loc && loc.pathname == ROUTES.CONTACTUS ? "default" : "poiinter",
          filter:
            loc && loc.pathname == ROUTES.CONTACTUS ? "blur(5px)" : "none",
          ":hover": {
            transform:
              loc && loc.pathname == ROUTES.CONTACTUS ? "none" : "rotate(5deg)",
          },
        }}
      >
        Need To Talk to Us? Click Here
      </Button>
    </Box>
  );
};

export default Footer;
