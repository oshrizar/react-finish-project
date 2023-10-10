import React, { Fragment, useEffect, useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import SearchPartial from "../../components/Navbar/SearchPartial";
import CardHomeComponent from "./CardHomeComponent";
import ButtonsOfHomePage from "./ButtonsOfHomePage";
import handleErrorFromAxios from "../../utils/handleError";
// axios
import axios from "axios";
//css
import "./homePage.css";

const HomePage = () => {
  const [cardsArrForHomePage, setCardsArrForHomePage] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(
          "http://localhost:8181/api/cards/allCards"
        );
        if (data.length >= 3) {
          data.length = 3;
        }
        setCardsArrForHomePage(data);
      } catch (err) {
        handleErrorFromAxios(err, undefined, false);
      }
    })();
  }, []);
  const breakPoint = "md";
  return (
    <Fragment>
      {/* banner */}
      <Box component="div" className="banner">
        <Typography gutterBottom component="h1" sx={{ color: "#fff" }}>
          Electro Master <br /> Your Master Shall Have All Your Desired Electric
          Products
        </Typography>
      </Box>
      {/* search div */}
      <Box
        component="div"
        sx={{
          marginBlock: "0.5rem",
          ml: "15vw",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <SearchPartial value={""} />
      </Box>
      {/* Content */}
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          gutterBottom
          component="h2"
          variant="h4"
          sx={{
            mt: 3,
          }}
        >
          The place to get yourself the best quality of electrics and digital
          items!
        </Typography>
        <Divider flexItem />
        <Typography
          variant="h6"
          sx={{ maxWidth: "500px", mt: 2, mb: 10, p: 2 }}
        >
          Electro Master is a cutting-edge technology company dedicated to
          pioneering advancements in the field of electronics and electrical
          engineering. With a strong focus on innovation and quality, we have
          achieved numerous accomplishments, including the development of
          energy-efficient consumer electronics, breakthroughs in renewable
          energy solutions, and the creation of smart devices that enhance
          everyday life. Our commitment to sustainability and excellence drives
          us to continually push the boundaries of what's possible in the world
          of electronics, making us a leader in the industry.
        </Typography>
        {/* Buttons of pages for home page */}
        <ButtonsOfHomePage breakPointProp={breakPoint} />
        {cardsArrForHomePage ? (
          <Fragment>
            <Typography component="h4" variant="h4">
              Some of our items:
            </Typography>
            {/* direct container of cards */}
            <Box
              component="div"
              sx={{
                mt: 2,
                mb: 10,
                width: "70vw",
                display: "flex",
                flexDirection: { xs: "column", [breakPoint]: "row" },
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {cardsArrForHomePage.map((card, i) => (
                <CardHomeComponent
                  key={i}
                  cardProp={card}
                  index={i}
                  cardsArrForHomePageProp={cardsArrForHomePage}
                />
              ))}
            </Box>
          </Fragment>
        ) : (
          ""
        )}
      </Container>
    </Fragment>
  );
};

export default HomePage;
