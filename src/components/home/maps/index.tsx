import { FunctionComponent, Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Maps: FunctionComponent = () => {
  return (
    <Fragment>
      {/* <GoogleMap center={{ lat: 18.52043, lng: 73.856743 }} zoom={10} />
      <Marker position={{ lat: 18.52043, lng: 73.856743 }} /> */}
      <Typography>Maps</Typography>
    </Fragment>
  );
};

export default Maps;
