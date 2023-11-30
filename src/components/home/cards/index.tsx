import { FunctionComponent } from "react";
import { Box, Typography, List, ListItem, Link, Theme } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { makeStyles } from "@mui/styles";
import InstagramIcon from "../../../assets/instagram.svg";
import FacebookIcon from "../../../assets/facebook.svg";
import SwipeableTextMobileStepper from "../imageCarousel";

import {
  CardsProps,
  PhotographerSessionDetails,
  LabelValueProps,
} from "../../../utils/models";
import dayjs from "dayjs";

const LabelValue: FunctionComponent<LabelValueProps> = ({
  label = null,
  value = null,
  direction = "row",
}) => {
  const classes = useStyles();
  return (
    <Box
      flexDirection={direction}
      justifyContent={direction === "row" ? "flex-start" : "flex-end"}
      alignItems={direction === "row" ? "center" : "flex-start"}
      className={classes.labelValueContainer}
    >
      <Box className={classes.labelContainer}>
        <Typography variant="h6" className={classes.label}>
          {label}:
        </Typography>
      </Box>
      <Typography className={classes.value} variant="caption">
        {value ? value : "-"}
      </Typography>
    </Box>
  );
};

const Cards: FunctionComponent<CardsProps> = ({
  region,
  results,
  photoGrapherSession,
  onClick = () => {},
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.mainContainer}>
      <Box my={1} mx={2}>
        <Typography variant="h5">{region}</Typography>
        <Typography variant="caption">
          Showing {results} available sessions
        </Typography>
      </Box>
      <List className={classes.listContainer} id="listt">
        {photoGrapherSession.map(
          (session: PhotographerSessionDetails, index: number) => {
            return (
              <ListItem
                className={classes.cardsContainer}
                key={index}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  onClick(index);
                }}
              >
                <SwipeableTextMobileStepper />
                <Box className={classes.card}>
                  <Box className={classes.socialContainer}>
                    {session.Instragram && (
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={session.Instragram}
                      >
                        <img width={24} height={24} src={InstagramIcon} />
                      </Link>
                    )}
                    {session.Facebook && (
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={session.Facebook}
                      >
                        <img width={24} height={24} src={FacebookIcon} />
                      </Link>
                    )}
                    {session.Website && (
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={session.Website}
                      >
                        <PublicIcon />
                      </Link>
                    )}
                  </Box>
                  <Typography variant="h6">{session.SessionName}</Typography>
                  <Typography variant="caption">{session.Address}</Typography>
                  <Typography variant="body1">
                    {dayjs(session.SessionDate).format("MM/DD")}
                  </Typography>
                  <Box className={classes.additionalInfoContainer}>
                    <LabelValue
                      label="Photographer"
                      value={
                        (session.PhotographerFirstName
                          ? session.PhotographerFirstName
                          : "") +
                        (session.PhotographerLastName
                          ? " " + session.PhotographerLastName
                          : "")
                      }
                    />
                    <LabelValue
                      label="Company"
                      value={session.PhotographerCompanyName as string | null}
                    />
                    <LabelValue
                      label="Email"
                      value={session.PhotographerEmail as string | null}
                    />
                    <LabelValue
                      label="Phone"
                      value={session.PhotographerPhone as string | null}
                    />
                  </Box>
                </Box>
              </ListItem>
            );
          }
        )}
      </List>
    </Box>
  );
};

export default Cards;

const useStyles = makeStyles((theme: Theme) => ({
  labelValueContainer: {
    display: "flex",
    width: "100%",
  },
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
    height: "100%",
    marginRight: 3,
    minWidth: "fit-content",
  },
  label: {
    fontSize: "12px !important",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    minWidth: "fit-content",
  },
  value: {
    fontSize: "12px !important",
    wordWrap: "break-word",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  listContainer: {
    padding: "20px 0",
  },
  cardsContainer: {
    display: "flex",
    borderBottom: "1px solid",
    columnGap: "20px",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      rowGap: "10px",
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "100%",

    height: "248px",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  additionalInfoContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  socialContainer: {
    display: "flex",
    columnGap: "15px",
    paddingTop: "5px",
    alignItems: "center",
  },
}));
