import { FunctionComponent, Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { MapsProps } from "../../../utils/models";

const Maps: FunctionComponent<MapsProps> = ({ markerPositions, center }) => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const handleActiveMarker = (marker: number | null) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <Fragment>
      <GoogleMap
        mapContainerClassName="map-container"
        center={{ lat: center?.Latitude || 0, lng: center?.Longitude || 0 }}
        zoom={5}
        onClick={() => setActiveMarker(null)}
      >
        {markerPositions.map((position, index) => {
          return (
            <Marker
              key={index}
              position={{ lat: position.lat, lng: position.lng }}
              icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
              onClick={() => handleActiveMarker(index)}
            >
              {activeMarker === index ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    width="200px"
                    height="225px"
                    rowGap={0.5}
                  >
                    <img height="150px" width="200px" src={position.img} />
                    <Typography variant="h6">{position.sessionName}</Typography>
                    <Typography variant="caption">
                      {position.address}
                    </Typography>
                  </Box>
                </InfoWindow>
              ) : null}
            </Marker>
          );
        })}
      </GoogleMap>
    </Fragment>
  );
};

export default Maps;
