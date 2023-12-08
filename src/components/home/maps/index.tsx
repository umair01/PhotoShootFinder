import { FunctionComponent, Fragment, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { GoogleMap, MarkerF, InfoWindow } from "@react-google-maps/api";
import { MapsProps } from "../../../utils/models";
const USLatitude = 47.66607027721706
const USLongitude = -107.2458309040137

const Maps: FunctionComponent<MapsProps> = ({
  markerPositions,
  center,
  markerIndex,
  onClick = () => {},
}) => {
  console.log("center",center)
  return (
    <Fragment>
      <GoogleMap
        mapContainerClassName="map-container"
        center={{ lat: center?.Latitude || USLatitude, lng: center?.Longitude || USLongitude }}
        zoom={7}
        onClick={() => onClick(null)}
      >
        {markerPositions.map((position, index) => {
          return (
            <MarkerF
              key={index}
              position={{ lat: position.lat, lng: position.lng }}
              icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
              onMouseOver={() => onClick(index)}
              onMouseOut={() => onClick(null)}
              onMouseDown={() => onClick(index)}
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
