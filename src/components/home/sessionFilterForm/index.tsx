import {
  FunctionComponent,
  Fragment,
  useEffect,
  useState,
  useRef,
} from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
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

import { SessionFormProps, FormProps, Fields } from "../../../utils/models";
import { getRegions, getSessions } from "../../../api/basicData";
import { Loader } from "../..";

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
    alignItems: "center",
    justifyContent: "center",
    padding: "0 10px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  height: {
    height: 56,
  },
  inputs: { borderRadius: 0 },
  select: {
    minWidth: "170px !important",
  },
  regionSelect: {
    borderRadius: 0,
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
  },

  datePicker: {
    width: 170,
  },
  button: {
    width: 120,
    height: 56,
    borderRadius: 30,
    fontSize: "14px !important",
    padding: "6px !important",
    color: theme.palette.common.white + "!important",
  },
  fontColor: {
    color: theme.palette.text.secondary,
  },
}));

const MyForm: FunctionComponent<FormProps> = ({
  onSubmit,
  control,
  setValue,
  getValues,
  watch,
  regions,
  sessions
}) => {
  const classes = useStyles();
  const responsiveInputs = useMediaQuery("(max-width:700px)");
 
  const initialRender = useRef(0);

  useEffect(() => {
    if (initialRender.current === 0) {
      initialRender.current++;
      return;
    } else if (initialRender.current === 1) {
      initialRender.current++;
      return;
    } else {
      onSubmit(getValues());
    }
  }, [watch]);

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



  return (
    <Box rowGap={2} className={classes.formContainer}>
      <FormControl className={`${classes.height} ${classes.select}`}>
        <Controller
          name="region"
          control={control}
          render={({ field }) => (
            <Select {...field} className={classes.regionSelect}>
              {regions?.map((region, index) => (
                <MenuItem key={index} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <FormControl className={classes.select}>
        <Controller
          name="sessionType"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              sx={{
                borderRadius: 0,
                borderTopRightRadius: responsiveInputs ? "30px" : 0,
                borderBottomRightRadius: responsiveInputs ? "30px" : 0,
              }}
            >
              {sessions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <Box>
        <FormControl className={classes.datePicker}>
          <Controller
            name="fromDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  disablePast
                  sx={{
                    ".MuiOutlinedInput-root": {
                      borderRadius: 0,
                      borderTopLeftRadius: responsiveInputs ? "30px" : 0,
                      borderBottomLeftRadius: responsiveInputs ? "30px" : 0,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </FormControl>

        <FormControl className={classes.datePicker}>
          <Controller
            name="toDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  disablePast
                  sx={{
                    ".MuiOutlinedInput-root": {
                      borderRadius: 0,
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </FormControl>
      </Box>
      <Box rowGap={2} columnGap={2} className={classes.buttonContainer}>
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
      </Box>
    </Box>
  );
};

const SessionFilterForm: FunctionComponent<SessionFormProps> = ({
  onSubmit,
  defaultValues = {},
  regions,
  sessions
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:780px)");
  const { control, setValue, getValues } = useForm<Fields>({
    defaultValues: { ...defaultValues },
  });
  const watch = useWatch({ control });

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
              control={control}
              setValue={setValue}
              getValues={getValues}
              watch={watch}
              regions={regions}
              sessions={sessions}
            />
          </AccordionDetails>
        </Accordion>
      ) : (
        <MyForm
          onSubmit={onSubmit}
          control={control}
          setValue={setValue}
          getValues={getValues}
          watch={watch}
          regions={regions}
          sessions={sessions}
        />
      )}
    </Fragment>
  );
};

export default SessionFilterForm;
