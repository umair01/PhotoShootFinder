import React from "react";
import { Container, Typography, Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const useStyles = makeStyles((theme: Theme) => ({
  notFoundContainer: {
    display: "flex !important",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  icon: {
    fontSize: 100,
    color: theme.palette.primary.main,
  },
}));

const NotFoundPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.notFoundContainer}>
      <ErrorOutlineIcon className={classes.icon} />
      <Typography variant="h5" align="center" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
