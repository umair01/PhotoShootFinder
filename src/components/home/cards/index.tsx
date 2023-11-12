import { Fragment, FunctionComponent } from "react";
import {
  Stack,
  Box,
  Typography,
  List,
  ListItem,
  Card,
  Link,
  IconButton,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import {
  CardsProps,
  PhotographerSessionDetails,
  LabelValueProps,
} from "../../../utils/models";

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
      <List className={classes.listContainer}>
        {photoGrapherSession.map(
          (session: PhotographerSessionDetails, index: number) => {
            return (
              <ListItem className={classes.cardsContainer} key={index}>
                <Card className={classes.card} variant="outlined">
                  <Box columnGap={1} className={classes.cardStackContainer}>
                    <Stack className={classes.cardStack1} flexGrow={2}>
                      <LabelValue
                        label="Session Name"
                        value={session.SessionName}
                      />
                      <LabelValue
                        label="Photographer"
                        value={
                          session.PhotographerFirstName +
                          " " +
                          session.PhotographerLastName
                        }
                      />
                      <LabelValue
                        label="Company"
                        value={session.CompanyNotes as string | null}
                      />
                      <LabelValue
                        label="Email"
                        value={session.PhotographerEmail as string | null}
                      />
                      <LabelValue
                        label="Phone"
                        value={session.PhotographerPhone as string | null}
                      />
                      <LabelValue label="Location" value={session.Address} />
                      <LabelValue
                        label="How to Book"
                        value={session.PreferredContactMethod as string | null}
                      />
                    </Stack>
                    <Stack className={classes.cardStack2} flexGrow={2}>
                      <LabelValue
                        label="Event Dates"
                        value={session.SessionDate}
                        direction="column"
                      />
                      <LabelValue
                        label="Session Types"
                        value={session.SessionType}
                        direction="column"
                      />
                    </Stack>
                    <Stack className={classes.cardStack3} flexGrow={1}>
                      {session.Instragram && (
                        <Link
                          target="_blank"
                          rel="noreferrer"
                          href={session.Instragram}
                        >
                          <IconButton>
                            <InstagramIcon />
                          </IconButton>
                        </Link>
                      )}
                      {session.Facebook && (
                        <Link
                          target="_blank"
                          rel="noreferrer"
                          href={session.Facebook}
                        >
                          <IconButton>
                            <FacebookIcon />
                          </IconButton>
                        </Link>
                      )}
                      {session.Website && (
                        <Link
                          target="_blank"
                          rel="noreferrer"
                          href={session.Website}
                        >
                          <Typography fontSize={14} variant="body1">
                            Website
                          </Typography>
                        </Link>
                      )}
                    </Stack>
                  </Box>
                </Card>
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
    width: "178px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
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
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  card: {
    display: "flex",
    minWidth: "320px",
    maxWidth: "500px",
    height: "fit-content",
    borderRadius: "5px",
    borderColor: theme.palette.primary.main + " !important",
    transition: "box-shadow .3s",
    "&:hover": {
      boxShadow: "0 0 11px rgba(33,33,33,.2)",
    },
  },
  cardStackContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  cardStack1: {
    padding: "10px",
    height: "100%",
    justifyContent: "flex-start",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  },
  cardStack2: {
    padding: "10px",
    height: "100%",
    justifyContent: "flex-end",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      flexDirection: "row !important",
    },
  },
  cardStack3: {
    padding: "10px",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row !important",
    },
  },
}));
