import { FunctionComponent } from "react";
import { Container, Typography, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  comingSoonContainer: {
    display: "flex !important",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: theme.spacing(2),
  },
  description: {
    fontSize: "1.2rem",
    textAlign: "center",
  },
}));

const ComingSoonPage: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.comingSoonContainer}>
      {/* <Typography variant="h2" className={classes.heading}>
        Coming Soon
      </Typography> */}
      <Typography variant="body1" className={classes.heading}>
        Welcome to Photo Shoot Finder. A centralized place for finding
        photographers holding photo shoots by location and dates. You’ll find
        the photographer’s website, Instagram, & Facebook.
        <br />
        <br />
        Contact me, Umair, at{" "}
        <a href="mailto:khan5426@outlook.com"> khan5426@outlook.com</a>
        <br />
        <br />
        To add or remove a listing use the above eMail address.
      </Typography>
    </Container>
  );
};

export default ComingSoonPage;
