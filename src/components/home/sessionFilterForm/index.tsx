import { FunctionComponent, Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Theme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ExpandMore } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { SessionFormProps, FormProps, Fields } from "../../../utils/models";
import { getRegions, getSessions } from "../../../api/basicData";

// const subRegions: { [key: string]: string[] } = {
//   "SF Bay Area": ["San Francisco", "San Jose", "Oakland"],
//   "New York": ["Manhattan", "Brooklyn", "Queens"],
//   "Los Angeles": ["Downtown LA", "Hollywood", "Santa Monica"],
// };


const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px 10px",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  height: {
    height: 56,
  },
  select: {
    minWidth: "170px !important",
  },
  datePicker: {
    width: 170,
  },
  button: {
    width: 105,
    height: 30,
    fontSize: "12px !important",
    padding: "6px !important",
    color: theme.palette.common.white + "!important",
  },
  fontColor: {
    color: theme.palette.text.secondary,
  },
}));

const MyForm: FunctionComponent<FormProps> = ({
  onSubmit,
  handleSubmit,
  control,
  setValue,
  getValues,
}) => {
  // const [selectedRegion, setSelectedRegion] = useState("SF Bay Area");
  const classes = useStyles();
  const [regions, setRegions] = useState<string[]>([]);
  const [sessionTypes, setSessionTypes] = useState<string[]>([]);
  const handle30Days = () => {
    const currentDate = getValues("fromDate").add(30, "day");
    const nextDate = currentDate.add(30, "day");
    setValue("fromDate", currentDate);
    setValue("toDate", nextDate);
  };

  const handle90Days = () => {
    const currentDate = getValues("fromDate").add(90, "day");
    const nextDate = currentDate.add(90, "day");
    setValue("fromDate", currentDate);
    setValue("toDate", nextDate);
  };

  useEffect(() => {
    getBasicData();
  }, []);

  const getBasicData = async () => {
    const [region, sessions] = await Promise.all([
      await getRegions(),
      await getSessions(),
    ]);
    setRegions(region);
    setSessionTypes(sessions);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box rowGap={2} columnGap={0.5} className={classes.formContainer}>
        <FormControl className={classes.select}>
          <InputLabel>Region</InputLabel>
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <Select {...field} label="region">
                {regions?.map((region, index) => (
                  <MenuItem key={index} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {/* <FormControl className={`${classes.height} ${classes.select}`}>
          <InputLabel>Subregion</InputLabel>
          <Controller
            name="subRegion"
            control={control}
            render={({ field }) => (
              <Select {...field} label="subregion">
                {subRegions[selectedRegion]?.map((subRegion, index) => (
                  <MenuItem key={index} value={subRegion}>
                    {subRegion}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl> */}

        <FormControl className={`${classes.height} ${classes.select}`}>
          <InputLabel>Session</InputLabel>
          <Controller
            name="session"
            control={control}
            render={({ field }) => (
              <Select {...field} label="session">
                {sessionTypes.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl className={`${classes.height} ${classes.datePicker}`}>
          <Controller
            name="fromDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker {...field} disablePast label="From Date" />
              </LocalizationProvider>
            )}
          />
        </FormControl>

        <FormControl className={`${classes.height} ${classes.datePicker}`}>
          <Controller
            name="toDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker {...field} disablePast label="To Date" />
              </LocalizationProvider>
            )}
          />
        </FormControl>
        <Box rowGap={2} columnGap={0.5} className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handle30Days}
          >
            Next 30 Days
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handle90Days}
          >
            Next 90 Days
          </Button>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};

const SessionFilterForm: FunctionComponent<SessionFormProps> = ({
  onSubmit,
  defaultValues = {},
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:780px)");
  const { handleSubmit, control, setValue, getValues } = useForm<Fields>({
    defaultValues: { ...defaultValues },
  });

  return (
    <Fragment>
      {isMobile ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore className={classes.fontColor} />}
          >
            <Typography className={classes.fontColor}>Filters</Typography>{" "}
            <FilterAltIcon className={classes.fontColor} />
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0 }}>
            <MyForm
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              control={control}
              setValue={setValue}
              getValues={getValues}
            />
          </AccordionDetails>
        </Accordion>
      ) : (
        <MyForm
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
      )}
    </Fragment>
  );
};

export default SessionFilterForm;
