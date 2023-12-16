import { FunctionComponent } from "react";
import { Box, Typography, List, ListItem, Link, Theme } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { makeStyles } from "@mui/styles";
import InstagramIcon from "../../../assets/instagram.svg";
import FacebookIcon from "../../../assets/facebook.svg";
import SwipeableTextMobileStepper from "../imageCarousel";

import {
  CardsProps,
  SessionDetails,
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
        {photoGrapherSession.map((session: SessionDetails, index: number) => {
          return (
            <ListItem
              className={classes.cardsContainer}
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                onClick(index);
              }}
            >
              <SwipeableTextMobileStepper images={session.sessionImages} />
              <Box className={classes.card}>
                {/* {dayjs().isAfter(session.sessionDates.SessionDate) && (
                  <Typography variant="body1" fontWeight="bold" color="#FF0000">
                    Past Event
                  </Typography>
                )} */}
                {dayjs().isAfter(
                  session?.sessionDates !== null
                    ? session?.sessionDates[0]?.SessionDate
                    : ""
                ) && (
                  <Typography variant="body1" fontWeight="bold" color="#FF0000">
                    Past Event
                  </Typography>
                )}
                <Box className={classes.socialContainer}>
                  {session.photographer.Instagram && (
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={session.photographer.Instagram}
                      onClick={(e: any) => e.stopPropagation()}
                    >
                      <img width={24} height={24} src={InstagramIcon} />
                    </Link>
                  )}
                  {session.photographer.Facebook && (
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={session.photographer.Facebook}
                      onClick={(e: any) => e.stopPropagation()}
                    >
                      <img width={24} height={24} src={FacebookIcon} />
                    </Link>
                  )}
                  {session.photographer.Website && (
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={session.photographer.Website}
                      onClick={(e: any) => e.stopPropagation()}
                    >
                      <PublicIcon />
                    </Link>
                  )}
                </Box>
                <Typography variant="h6">{session.SessionName}</Typography>
                <Typography variant="caption">{session.Address}</Typography>
                {/* <LabelValue
                  label="Event Dates"
                  value={dayjs(session?.sessionDates.SessionDate).format(
                    "MM/DD"
                  )}
                /> */}

                <LabelValue
                  label="Event Dates"
                  value={
                    session?.sessionDates !== null &&
                    session?.sessionDates?.length > 0
                      ? session?.sessionDates
                          .map((date) => {
                            return dayjs(date.SessionDate).format("MM/DD");
                          })
                          .join(", ")
                      : ""
                  }
                />

                <Box className={classes.additionalInfoContainer}>
                  <LabelValue
                    label="Photographer"
                    value={
                      (session.photographer.PhotographerFirstName
                        ? session.photographer.PhotographerFirstName
                        : "") +
                      (session.photographer.PhotographerLastName
                        ? " " + session.photographer.PhotographerLastName
                        : "")
                    }
                  />
                  <LabelValue
                    label="Company"
                    value={
                      session.photographer.PhotographerCompanyName as
                        | string
                        | null
                    }
                  />
                  <LabelValue
                    label="Email"
                    value={
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={`mailto:${session.photographer.PhotographerEmail}`}
                        onClick={(e: any) => e.stopPropagation()}
                      >
                        {session.photographer.PhotographerEmail}
                      </Link>
                    }
                  />
                  <LabelValue
                    label="Phone"
                    value={
                      session.photographer.PhotographerPhone as string | null
                    }
                  />
                  <LabelValue
                    label="Location"
                    value={session.Location as string | null}
                  />
                  <LabelValue
                    label="How to Book"
                    value={session.HowToBook}
                  />
                  <LabelValue
                    label="Session Types"
                    value={session.sessionType?.SessionType as string | null}
                  />
                </Box>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Cards;

const useStyles = makeStyles((theme: Theme) => ({
  labelValueContainer: {
    display: "flex",
    width: "100%",
    overflow: "hidden",
  },
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
    height: "100%",
    marginRight: 3,
    minWidth: "fit-content",
  },
  label: {
    fontSize: "16px !important",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    minWidth: "fit-content",
  },
  value: {
    fontSize: "16px !important",
    wordWrap: "break-word",
  },
  mainContainer: {
    width: "100%",
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

    height: "fit-content",
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
