import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import validateIdSchema from "../../validations/idValidate";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import makeALegitStringForImage from "../../utils/makeALegitStringForImage";
import makeTitle from "../../utils/makeATitle";
import COLORS from "../../colors/COLORS";
import RateSpecificProduct from "./RateSpecificProduct";
import { useSelector } from "react-redux";
import useTitle from "../../hooks/useTitle";
import handleErrorFromAxios from "../../utils/handleError";
import dollarIcon from "../../assets/icons/dollarSvg.svg";
import BuyNowPopup from "../../pages/specificProduct/BuyNowPopup";
import BackArrowButtonComp from "../../components/BackArrowButtonComp";
//css
import "./specificProduct.css";
const SpecificProductPage = () => {
  const { id } = useParams();
  const title = useTitle();
  const navigate = useNavigate();
  const [prevPage, setprevPage] = useState("");
  const [cardData, setCardData] = useState(null);
  const [openBuyNowPopup, setOpenBuyNowPopup] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [numOfUnlikes, setNumOfUnlikes] = useState(0);
  const [hasRatedAlready, setHasRatedAlready] = useState(false);
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  useEffect(() => {
    if (validateIdSchema(id)) {
      toast.error("something went wrong, try again later");
      navigate(ROUTES.HOME);
    }
    const prevPageFromLocalStorage = localStorage.getItem(
      "prev-page-for-back-arrow-btn"
    );
    switch (prevPageFromLocalStorage) {
      case "cart":
        setprevPage(ROUTES.CART);
        break;
      case "shop":
        setprevPage(ROUTES.SHOP);
        break;
      case "crm":
        setprevPage(ROUTES.CRM);
        break;
      default:
        setprevPage(ROUTES.SHOP);
        break;
    }
    (async () => {
      try {
        let { data } = await axios.get(
          `http://localhost:8181/api/cards/card/${id}`
        );
        delete data.__v;
        delete data.user_id;
        if (!data) {
          toast.warning(
            "not possible to load the information right now, try again later!"
          );
          navigate(ROUTES.HOME);
        }
        title(makeTitle(data.title));

        setCardData(data);
      } catch (err) {
        handleErrorFromAxios(
          err,
          "not possible to load the information right now, try again later!",
          false
        );
      }
    })();
  }, [id]);
  useEffect(() => {
    if (
      cardData &&
      cardData.rating &&
      cardData.rating.ratingUsers &&
      (cardData.rating.ratingTotalLikes ||
        cardData.rating.ratingTotalLikes === 0) &&
      (cardData.rating.ratingTotalUnlikes ||
        cardData.rating.ratingTotalUnlikes === 0)
    ) {
      for (const idOfUser of cardData.rating.ratingUsers) {
        if (payload && idOfUser == payload._id) {
          setHasRatedAlready(true);
          break;
        }
      }
      setNumOfLikes(cardData.rating.ratingTotalLikes);
      setNumOfUnlikes(cardData.rating.ratingTotalUnlikes);
    }
  }, [cardData]);
  const handleUnlikeClick = async () => {
    try {
      if (!cardData || !payload || hasRatedAlready) {
        return;
      }
      let { data } = await axios.patch(
        `http://localhost:8181/api/cards/rate/${id}`,
        { liked: false }
      );
      let newCardData = JSON.parse(JSON.stringify(cardData));
      newCardData.rating = { ...data.rating };
      setCardData(newCardData);
      setHasRatedAlready(true);
      toast.info("rated successfully, thank you for your review!");
    } catch (err) {
      handleErrorFromAxios(
        err,
        "problem liking the product right now, try again later",
        false
      );
    }
  };
  const handleLikeClick = async () => {
    try {
      if (!cardData || !payload || hasRatedAlready) {
        return;
      }
      let { data } = await axios.patch(
        `http://localhost:8181/api/cards/rate/${id}`,
        { liked: true }
      );
      let newCardData = JSON.parse(JSON.stringify(cardData));
      newCardData.rating = { ...data.rating };
      setCardData(newCardData);
      setHasRatedAlready(true);
      toast.info("rated successfully, thank you for your review!");
    } catch (err) {
      handleErrorFromAxios(
        err,
        "problem liking the product right now, try again later",
        false
      );
    }
  };
  const handleDollarClick = () => {
    setOpenBuyNowPopup(true);
  };
  const styleOfDetailsGrid = {
    marginBlock: "0.5rem",
    backgroundColor: COLORS.MAIN,
    borderRadius: "30px",
  };

  if (!cardData) {
    return <CircularProgress />;
  }
  return (
    <Container
      maxWidth="lg"
      component={Paper}
      sx={{
        border: `0.2rem solid ${COLORS.INVERTEDFROMMAIN}`,
      }}
    >
      <BuyNowPopup
        openStateProp={openBuyNowPopup}
        setOpenFunc={setOpenBuyNowPopup}
        title={`${makeTitle(
          cardData && cardData.title ? cardData.title : "this item"
        )}`}
      />
      <Grid container maxWidth="lg" sx={{ m: 5 }}>
        <Grid item xs={4} sm={3} md={2} lg={1}>
          <BackArrowButtonComp route={prevPage} />
        </Grid>

        <Grid item xs={9} sm={10} md={11} lg={12}>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              paddingTop: "2rem",
              marginBottom: "3rem",
              display: "inline-block",
            }}
          >
            {makeTitle(cardData.title)}
          </Typography>
          {/* //!BONUS: bonus no.4 - show the admin o the content page how many has added this item to their cart */}
          {payload && payload.isAdmin ? (
            <Typography>
              <Box component="span" sx={{ fontWeight: "bold", color: "red" }}>
                This information is for admins only!
              </Box>
              <br />
              {`So far, ${cardData && cardData.cart && cardData.cart.length} has
              added this item to their cart!`}
            </Typography>
          ) : (
            ""
          )}

          <Typography
            component="p"
            sx={{
              display: "block",
              fontSize: "1.2rem",
              textAlign: "center",
              fontWeight: "bolder",
              margin: 3,
            }}
          >
            {makeTitle(cardData.description)}
          </Typography>
          <RateSpecificProduct
            idOfCard={cardData && cardData._id}
            alreadyRatedProp={hasRatedAlready}
            numOfLikes={numOfLikes}
            numOfUnlikes={numOfUnlikes}
            likeClickFunc={handleLikeClick}
            unlikeClickFunc={handleUnlikeClick}
            payloadProp={payload}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <img
            src={makeALegitStringForImage(cardData)}
            alt={cardData.title}
            style={{
              borderRadius: "5px",
              width: "50%",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          />
        </Grid>
        <Grid item xs={2} md={4.5} />
        <Grid item xs={8} md={3} style={styleOfDetailsGrid}>
          <Typography component="h4" variant="h6">
            ${cardData && cardData.price}
          </Typography>
          <Tooltip title={`Buy '${cardData && cardData.title}'`}>
            <IconButton
              variant="contained"
              color="info"
              onClick={handleDollarClick}
              id={""}
              sx={{
                aspectRatio: "1/1",
                width: "3em",
                p: 1,
                m: 1,
              }}
            >
              <img id="dollar-icon" src={dollarIcon} alt="buy button" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={2} md={4.5} />
        <Grid item xs={2} md={4.5} />
        <Grid item xs={8} md={3} style={styleOfDetailsGrid}>
          <Typography component="h4" variant="h6">
            {cardData && cardData.stock} Left In Stock
          </Typography>
        </Grid>
        <Grid item xs={2} md={4.5} />
      </Grid>
    </Container>
  );
};

export default SpecificProductPage;
