import { FunctionComponent, Fragment, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { GoogleMap, MarkerF, InfoWindow } from "@react-google-maps/api";
import { MapsProps } from "../../../utils/models";
const USLatitude = 37.828724;
const USLongitude = -122.355537;

const Maps: FunctionComponent<MapsProps> = ({
  markerPositions,
  center,
  markerIndex,
  onClick = () => {},
  onDragMap,
  formValues,
  onChangeCenter,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [drag, setDrag] = useState(false);
  const handleMapLoad = (map: google.maps.Map) => {
    setMap(map);
    map.addListener("dragend", () => {
      if (map) {
        const newCenter = map?.getCenter()?.toJSON();
        onChangeCenter(newCenter?.lat, newCenter?.lng);
        setDrag(true);
      }
    });
  };
  useEffect(() => {
    if (drag) {
      const newCenter = map?.getCenter()?.toJSON();
      const bounds = map?.getBounds();
      const ne = bounds?.getNorthEast().toJSON();
      const sw = bounds?.getSouthWest().toJSON();
      onDragMap(
        newCenter?.lat,
        newCenter?.lng,
        {
          neLat: ne?.lat,
          swLat: sw?.lat,
          neLng: ne?.lng,
          swLng: sw?.lng,
        },
        formValues
      );
      setDrag(false);
    }
  }, [drag]);
  return (
    <Fragment>
      <GoogleMap
        mapContainerClassName="map-container"
        center={{
          lat: center?.Latitude || USLatitude,
          lng: center?.Longitude || USLongitude,
        }}
        zoom={center ? 8 : 4}
        onClick={() => onClick(null)}
        onLoad={handleMapLoad}
      >
        {markerPositions.map((position, index) => {
          return (
            <MarkerF
              key={index}
              position={{ lat: position.lat, lng: position.lng }}
              icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
              onMouseOver={() => onClick(index, true)}
              onMouseOut={() => onClick(null)}
              onMouseDown={() => onClick(index, true)}
            >
              {markerIndex === index && (
                <InfoWindow onCloseClick={() => onClick(null)}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    width="100%"
                    rowGap={0.5}
                  >
                    <Typography variant="h6" fontSize="18px">
                      {position.sessionName}
                    </Typography>
                    <Typography variant="body1">
                      <Box
                        color={(theme) => theme.palette.text.secondary}
                        fontWeight="bold"
                        component="span"
                      >
                        Company:{" "}
                      </Box>
                      {position.companyName ?? "-"}
                    </Typography>

                    <Typography variant="body1">
                      <Box
                        color={(theme) => theme.palette.text.secondary}
                        fontWeight="bold"
                        component="span"
                      >
                        Session Dates:{" "}
                      </Box>
                      {position.sessionDate ?? "-"}
                    </Typography>
                    <Typography variant="body1">
                      <Box
                        color={(theme) => theme.palette.text.secondary}
                        fontWeight="bold"
                        component="span"
                      >
                        Session Type:{" "}
                      </Box>
                      {position.sessionType ?? "-"}
                    </Typography>
                  </Box>
                </InfoWindow>
              )}
            </MarkerF>
          );
        })}
      </GoogleMap>
    </Fragment>
  );
};

export default Maps;
