import React, { Fragment, useState } from "react";
import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import OfflinePinRoundedIcon from "@mui/icons-material/OfflinePinRounded";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import COLORS from "../../colors/COLORS";
const RateSpecificProduct = ({
  alreadyRatedProp,
  payloadProp,
  numOfLikes,
  numOfUnlikes,
  forShopPage,
  likeClickFunc,
  unlikeClickFunc,
}) => {
  const navigate = useNavigate();
  const [isHoveredLike, setIsHoveredLike] = useState(false);
  const [isHoveredUnlike, setIsHoveredUnlike] = useState(false);
  const handleLikeClick = () => {
    likeClickFunc();
  };
  const handleUnlikeClick = () => {
    unlikeClickFunc();
  };
  const handleHoverLike = () => {
    setIsHoveredLike(true);
  };
  const handleHoverUnlike = () => {
    setIsHoveredUnlike(true);
  };
  const handleNotHoverLike = () => {
    setIsHoveredLike(false);
  };
  const handleNotHoverUnlike = () => {
    setIsHoveredUnlike(false);
  };
  const clickCheck = () => {
    navigate(ROUTES.LOGIN);
  };
  const isArrowTooltipDisplayedOnShopPage = forShopPage
    ? false
    : !payloadProp || alreadyRatedProp
    ? true
    : false;
  return (
    <Container
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip
        title={
          alreadyRatedProp ? (
            "already rated this item"
          ) : !payloadProp ? (
            <Fragment>
              <span
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: COLORS.MAIN,
                }}
                onClick={clickCheck}
              >
                login
              </span>{" "}
              in order to rate this item
            </Fragment>
          ) : (
            ""
          )
        }
        enterDelay={300}
        disableHoverListener={isArrowTooltipDisplayedOnShopPage ? false : true}
      >
        <Box
          component="span"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="h3" variant="h6">
            {forShopPage
              ? ""
              : "Did you like this product? Did you not? Choose your opinion below"}
          </Typography>
          <Box component="div" sx={{ display: "flex" }}>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={handleLikeClick}
                onMouseEnter={handleHoverLike}
                onMouseLeave={handleNotHoverLike}
                disabled={forShopPage || alreadyRatedProp}
              >
                {isHoveredLike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
              </IconButton>
              <Typography component="h6">{numOfLikes}</Typography>
            </Box>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={handleUnlikeClick}
                onMouseEnter={handleHoverUnlike}
                onMouseLeave={handleNotHoverUnlike}
                disabled={forShopPage || alreadyRatedProp}
              >
                {isHoveredUnlike ? (
                  <ThumbDownAltIcon />
                ) : (
                  <ThumbDownOffAltIcon />
                )}
              </IconButton>
              <Typography component="h6">{numOfUnlikes}</Typography>
            </Box>
          </Box>
          {!alreadyRatedProp || forShopPage ? (
            ""
          ) : (
            <Typography
              component="h4"
              variant="h6"
              sx={{
                alignItems: "center",
                alignSelf: "center",
                display: "flex",
                fontWeight: "bolder",
              }}
            >
              You Have Rated This Product
              <OfflinePinRoundedIcon sx={{ color: "green" }} />
            </Typography>
          )}
        </Box>
      </Tooltip>
    </Container>
  );
};

RateSpecificProduct.defaultProps = {
  alreadyRatedProp: true,
  forShopPage: false,
  unlikeClickFunc: () => {},
  likeClickFunc: () => {},
};

export default RateSpecificProduct;
