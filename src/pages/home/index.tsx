import {
  Fragment,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  useMediaQuery,
  Typography,
  CircularProgress,
} from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useLoadScript } from "@react-google-maps/api";
import dayjs from "dayjs";

import { Fields, SessionDetails, Region } from "../../utils/models";
import { SessionForm, Cards, Maps, Loader } from "../../components";
import { getPhotographerSessions } from "../../api/home";
import { buildQueryString } from "../../utils";
import { getRegions, getSessions } from "../../api/basicData";
import { LIMIT } from "../../utils/constants";

const Home: FunctionComponent = () => {
  const responsiveView = useMediaQuery("(max-width:1200px)");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  const [formValues, setFormValues] = useState<Fields>({
    sessionType: "",
    region: "SF Bay Area",
    fromDate: dayjs(),
    toDate: dayjs().add(30, "day"),
  });
  const [userSelectedView, setUserSelectedView] = useState({
    list: true,
    maps: false,
  });

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [photographerSessions, setPhotographerSessions] = useState<
    SessionDetails[]
  >([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [sessions, setSessions] = useState<string[]>([]);
  const [loadData, setLoadData] = useState(false);
  const [lazyLoadingData, setLazyLoadingData] = useState(false);
  const [markerIndex, setMarkerIndex] = useState<number | null>(null);
  const [center, setCenter] = useState<Region | null>();
  const cardRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (data: Fields, lazyLoad = false) => {
    const query = buildQueryString({ ...data, page: lazyLoad ? page : 1 });
    if (lazyLoad) {
      await lazyLoadPhotographersData(query);
    } else {
      await getPhotographerData(query);
    }
    setFormValues(data);
  };

  const getPhotographerData = async (query?: string) => {
    setMarkerIndex(null);
    try {
      setLoading(true);
      const res = await getPhotographerSessions(query);
      setLoading(false);
      setLoadData(res?.length >= LIMIT);
      setPhotographerSessions(res);
    } catch (err) {
      console.log("something went wrong", err);
    }
  };

  const lazyLoadPhotographersData = async (query: string) => {
    try {
      setLazyLoadingData(true);
      const res = await getPhotographerSessions(query);
      setLazyLoadingData(false);
      setLoadData(res?.length >= LIMIT);
      setPhotographerSessions([...photographerSessions, ...res]);
    } catch (err) {
      console.log("something went wrong", err);
    }
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

  const handleScroll = async (e: any) => {
    const bottom =
      Math.round(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;
    if (bottom) {
      setPage((page) => page + 1);
      if (loadData) {
        await onSubmit(formValues, true);
        if (cardRef.current) {
          cardRef?.current?.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    }
  };

  const getBasicData = async () => {
    const [region, sessions] = await Promise.all([
      await getRegions(),
      await getSessions(),
    ]);
    setRegions(region);
    setSessions(sessions);
  };

  const handleMarkerIndex = (index: number | null) => {
    if (index === markerIndex) {
      setMarkerIndex(null);
    } else {
      if (responsiveView && !userSelectedView.maps) {
        setResponsiveView();
      }
      setMarkerIndex(index);
      if (index != null) {
        setCenter({
          Longitude: Number(
            photographerSessions[index].LocationLongitude || "0"
          ),
          Latitude: Number(photographerSessions[index].LocationLatitude || "0"),
        });
      }
    }
  };

  useEffect(() => {
    getBasicData();
  }, []);

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
      <SessionForm
        onSubmit={onSubmit}
        defaultValues={formValues}
        regions={regions}
        sessions={sessions}
      />
      <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            width: responsiveView ? "100%" : "60%",
            display: setView(userSelectedView.list) ? "block" : "none",
            padding: "10px",
            height: "100%",
            overflow: "hidden",
            overflowY: "auto",
          }}
          onScroll={handleScroll}
          ref={cardRef}
        >
          {loading ? (
            <Box
              display="flex"
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Fragment>
              {photographerSessions?.length ? (
                <>
                  <Cards
                    onClick={handleMarkerIndex}
                    region={formValues.region}
                    results={photographerSessions?.length || 0}
                    photoGrapherSession={photographerSessions}
                  />
                  {lazyLoadingData && <div>Loading....</div>}
                </>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h6">Address Not Found.</Typography>
                  <Typography>Please try a different location.</Typography>
                </Box>
              )}
            </Fragment>
          )}
        </Box>
        <Box
          sx={{
            width: responsiveView ? "100%" : "40%",
            display: setView(userSelectedView.maps) ? "block" : "none",
            height: "100%",
          }}
        >
          <Maps
            markerIndex={markerIndex}
            onClick={handleMarkerIndex}
            markerPositions={photographerSessions.map((photographerSession) => {
              return {
                sessionName: photographerSession?.SessionName,
                companyName:
                  photographerSession?.photographer.PhotographerCompanyName,
                sessionDate:
                  photographerSession?.sessionDates !== null &&
                  photographerSession?.sessionDates?.length > 0
                    ? photographerSession?.sessionDates?.map(
                        (date) => {
                          return dayjs(date.SessionDate).format("MM/DD");
                        }
                      ).join(", ")
                    : "",
                // sessionDate: dayjs(photographerSession?.sessionDates.SessionDate).format("MM/DD"),
                sessionType: photographerSession.sessionType.SessionType,
                lat:
                  parseFloat(photographerSession?.LocationLatitude || "0") || 0,
                lng:
                  parseFloat(photographerSession?.LocationLongitude || "0") ||
                  0,
              };
            })}
            center={
              center ||
              regions.find((region) => formValues.region == region.Region)
            }
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
