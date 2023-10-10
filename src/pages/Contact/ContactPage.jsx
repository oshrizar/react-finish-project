import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import COLORS from "../../colors/COLORS";
import ContactComp from "./ContactComp";

const ContactPage = () => {
  const theme = useTheme();
  const mediaQ = useMediaQuery(theme.breakpoints.down("md"));
  const arrOfContactWays = [
    {
      type: "facebook",
      title: "Electro Master",
      hrefLink: "http://www.facebook.com",
    },

    {
      type: "whatsapp",
      title: "Send us a message!",
      hrefLink:
        "https://wa.me/972546464092/?text=Hello Electro Master, I'd like to buy a few products from you!",
    },
    {
      type: "phone",
      title: "Call +972-54-646-4092",
      hrefLink: "tel:+972546464092",
    },
    {
      type: "instagram",
      title: "@ElectroMaster",
      hrefLink: "http://www.instagram.com",
    },
    {
      type: "email",
      title: "oshriz@ElectroMasterCompany.co.il",
      hrefLink:
        "mailto:oshriz@ElectroMasterCompany.co.il?subject=Website%20Message&body=Hello!%20I'd%20like%20to%20talk%20with%20you.",
    },
  ];
  const linkObjStyle = { color: COLORS.TEXT1, textDecoration: "none" };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{ mb: 2, color: COLORS.TEXT1 }}
        component="h2"
        variant="h2"
      >
        Contact us!
      </Typography>
      <Grid
        container
        sx={{
          p: 1,
          marginBlock: 10,
          justifyContent: "space-around",
          borderRadius: "50px",
          background: COLORS.SECONDARY,
          boxShadow: ` 0 0 15px 15px ${COLORS.SECONDARY} `,
        }}
      >
        {arrOfContactWays.map((item) =>
          //dont render phone contact when using pc
          !mediaQ && item && item.type === "phone" ? (
            ""
          ) : (
            <ContactComp
              key={item.title}
              title={item.title}
              hrefLinkProp={item.hrefLink}
              type={item.type}
              linkObjStyleProp={linkObjStyle}
            />
          )
        )}
      </Grid>
      <Grid
        container
        sx={{
          justifyContent: "space-around",
        }}
      >
        <Grid item xs={12}>
          <Box component="div" sx={{ height: "90px" }} />
          <LocationOnIcon sx={{ fontSize: "4rem" }} />
          <Typography component="h4" variant="h6">
            Our Factory On The Map!
          </Typography>
          <Grid item xs={12}>
            <iframe
              title="Location of Electro Master"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3487012.6004784307!2d35.081815549999995!3d31.406252499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1500492432a7c98b%3A0x6a6b422013352cba!2sIsrael!5e0!3m2!1sen!2sil!4v1696337841650!5m2!1sen!2sil"
              height="450"
              style={{ border: "2px solid black", width: "60vw" }}
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
