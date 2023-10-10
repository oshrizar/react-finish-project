import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import defaultMale from "../../assets/imgs/maleAvatar.jpg";
import defaultFemale from "../../assets/imgs/femaleAvatarpng.jpg";
import defaultOther from "../../assets/imgs/otherAvatar.jpg";
import errorImg from "../../assets/imgs/unavailable-image.jpg";
import NavbarLinkComponent from "./NavbarLinkComponent";
import COLORS from "../../colors/COLORS";
import ProfileComponent from "./ProfileComponent";
import HamburgerMenu from "./HamburgerMenu";
import { useSelector } from "react-redux";
import logoOfWeb from "../../assets/imgs/logoForNavbar.png";
//css
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  const { infoOfUser } = useSelector((bigRedux) => bigRedux.authSlice);
  const adminPages = [
    { label: "CRM", url: ROUTES.CRM },
    { label: "new item", url: ROUTES.CREATE },
  ];
  const notAuthedPages = [
    { label: "login", url: ROUTES.LOGIN },
    { label: "register", url: ROUTES.REGISTER },
  ];
  const allPages = [
    { label: "about", url: ROUTES.ABOUT },
    { label: "shop", url: ROUTES.SHOP },
    { label: "contact us", url: ROUTES.CONTACTUS },
  ];
  let finalArrPages = [...allPages];
  if (payload && !payload.isAdmin) {
    finalArrPages = [...allPages];
  } else if (payload && payload.isAdmin) {
    finalArrPages = [...allPages, ...adminPages];
  }
  const profilePages = [
    { label: "profile", url: ROUTES.PROFILE },
    { label: "cart", url: ROUTES.CART },
    { label: "log out", url: ROUTES.LOGOUT },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: COLORS.MAIN,
        maxHeight: "60px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            maxHeight: "60px",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
            }}
          >
            <img
              onClick={handleLogoClick}
              src={logoOfWeb}
              alt='Logo Of Website written "Electro Master"'
              style={{
                width: "100px",
                maxHeight: "50px",
                borderRadius: "50px",
                cursor: "pointer",
              }}
            />
            {/* main navbar on desktop */}
            {finalArrPages.map((page) => (
              <NavbarLinkComponent
                key={page.url}
                label={page.label}
                url={page.url}
                {...page}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: { xs: "flex", lg: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProfileComponent
              imageProp={infoOfUser && infoOfUser.image}
              profileComponentNav={profilePages}
              anchorElProp={anchorElUser}
              handleCloseUMProp={handleCloseUserMenu}
              handleOpenUMProp={handleOpenUserMenu}
              defaultPic={
                infoOfUser && infoOfUser.gender == "male"
                  ? defaultMale
                  : payload && payload.gender == "female"
                  ? defaultFemale
                  : payload && payload.gender == "other"
                  ? defaultOther
                  : errorImg
              }
            />
          </Box>
          <Box
            component="div"
            sx={{
              display: { xs: "flex", lg: "none" },
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <HamburgerMenu
              handleOpenNMProp={handleOpenNavMenu}
              handleCloseNMProp={handleCloseNavMenu}
              anchorElNavProp={anchorElNav}
              pagesProp={
                (!payload && [...finalArrPages, ...notAuthedPages]) ||
                finalArrPages
              }
            />
            <img
              onClick={handleLogoClick}
              src={logoOfWeb}
              alt='Logo Of Website written "Electro Master"'
              style={{
                width: "100px",
                maxHeight: "50px",
                borderRadius: "50px",
                cursor: "pointer",
              }}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              justifySelf: "end",
            }}
          >
            {/* main navbar on desktop */}
            {!payload &&
              notAuthedPages.map((page) => (
                <NavbarLinkComponent
                  key={page.url}
                  label={page.label}
                  url={page.url}
                  {...page}
                />
              ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
