import * as React from "react";
import { useTheme, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { IImageCarousel } from "../../../utils/models";
import noImage from "../../../assets/noImage.svg";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const SwipeableTextMobileStepper: React.FunctionComponent<IImageCarousel> = ({
  images,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = (e: any) => {
    e.stopPropagation();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (e: any) => {
    e.stopPropagation();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: 320 },
        minWidth: { xs: "100%", sm: 320 },
        flexGrow: 1,
        borderRadius: 7.5,
        overflow: "hidden",
      }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 250,
                    display: "block",
                    overflow: "hidden",
                    maxWidth: { xs: "100%", sm: 320 },
                    minWidth: { xs: "100%", sm: 320 },
                  }}
                  src={image.ImageUrl}
                />
              ) : null}
            </div>
          ))
        ) : (
          <Box
            component="img"
            sx={{
              height: 250,
              display: "block",
              overflow: "hidden",
              maxWidth: { xs: "100%", sm: 320 },
              minWidth: { xs: "100%", sm: 320 },
            }}
            src={noImage}
          />
        )}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ bgcolor: (theme: Theme) => theme.palette.background.paper }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1 || !images.length}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0 || !images.length}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
};

export default SwipeableTextMobileStepper;
