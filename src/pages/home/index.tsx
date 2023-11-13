import { FunctionComponent, useState } from "react";
import { Box, Button, useMediaQuery, Theme, Typography } from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useJsApiLoader } from "@react-google-maps/api";
import dayjs from "dayjs";

import { Fields } from "../../utils/models";
import { SessionForm, Cards, Maps, Loader } from "../../components";
import { getPhotographerSessions } from "../../api/home";
import { buildQueryString } from "../../utils";

const MockSessionData = {
  SessionName: "Session",
  SessionDate: "23-11, 23-12",
  SessionType: "Family",
  Address: "Addrress",
  LocationLongitude: "21",
  LocationLatitude: "12",
  Region: "Region",
  PhotographersID: 1,
  PhotographerCompanyName: "Company Name",
  Instragram: "https://www.instagam.com",
  Website: "https://www.google.com",
  Facebook: "https://www.faceebook.com",
  PreferredContactMethod: "Call",
  CompanyNotes: "Notes",
  PhotographerFirstName: "John",
  PhotographerLastName: "Doe",
  PhotographerPhone: "000000000000",
  PhotographerEmail: "john@doe.com",
};

const Home: FunctionComponent = () => {
  const responsiveView = useMediaQuery("(max-width:1200px)");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  const [formValues, setFormVlaues] = useState<Fields>({
    region: "SF Bay Area",
    // subRegion: "",
    session: [],
    fromDate: dayjs(),
    toDate: dayjs().add(90, "day"),
  });
  const [userSelectedView, setUserSelectedView] = useState({
    list: true,
    maps: false,
  });

  const [photographerSessions,setPhotographerSessions]= useState([])

  const onSubmit = async (data: Fields) => {
  
    const query = buildQueryString(data)
    const res = await getPhotographerSessions(query)
    setPhotographerSessions(res)
  
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
            region="San Francisco"
            results={22}
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
          <Maps />
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
