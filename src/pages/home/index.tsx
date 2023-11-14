import { FunctionComponent, useMemo, useState } from "react";
import { Box, Button, useMediaQuery, Theme, Typography } from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";
import dayjs from "dayjs";

import { Fields, PhotographerSessionDetails } from "../../utils/models";
import { SessionForm, Cards, Maps, Loader } from "../../components";
import { getPhotographerSessions } from "../../api/home";
import { buildQueryString } from "../../utils";

const Home: FunctionComponent = () => {
  const responsiveView = useMediaQuery("(max-width:1200px)");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  const [formValues, setFormVlaues] = useState<Fields>({
    region: "SF Bay Area",
    sessionType:"Family",
    fromDate: dayjs(),
    toDate: dayjs().add(90, "day"),
  });
  const [userSelectedView, setUserSelectedView] = useState({
    list: true,
    maps: false,
  });

  const [photographerSessions, setPhotographerSessions] = useState<
    PhotographerSessionDetails[]
  >([]);

  const onSubmit = async (data: Fields) => {
    const query = buildQueryString(data);
    const res = await getPhotographerSessions(query);
    setPhotographerSessions(res);
  };

  const setView = (userView: boolean) => {
    if (!responsiveView) {
      return true;
    }
    return (responsiveView && userView) || userView;
  };

  const setResponsiveView = () => {
    setUserSelectedView((prevUserSelectedView) => {
      return {
        list: !prevUserSelectedView.list,
        maps: !prevUserSelectedView.maps,
      };
    });
  };

  if (!isLoaded) return <Loader />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <SessionForm onSubmit={onSubmit} defaultValues={formValues} />
      <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            width: responsiveView ? "100%" : "60%",
            display: setView(userSelectedView.list) ? "block" : "none",
            padding: "10px",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Cards
            region={formValues.region}
            results={photographerSessions?.length || 0}
            photoGrapherSession={photographerSessions}
          />
        </Box>
        <Box
          sx={{
            width: responsiveView ? "100%" : "40%",
            display: setView(userSelectedView.maps) ? "block" : "none",
            height: "100%",
            background: (theme: Theme) => theme.palette.secondary.main,
          }}
        >
          <Maps
            markerPositions={photographerSessions.map((photographerSession) => {
              return {
                lat: photographerSession?.LocationLatitude || 0,
                lng: photographerSession?.LocationLongitude || 0,
              };
            })}
          />
        </Box>
      </Box>
      {responsiveView && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: 35,
            width: "100%",
          }}
        >
          <Button variant="contained" onClick={setResponsiveView}>
            {userSelectedView.list ? (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography>Maps</Typography>
                <MapOutlinedIcon />
              </Box>
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography>List</Typography>
                <FormatListBulletedIcon />
              </Box>
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;
