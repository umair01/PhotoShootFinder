import { FunctionComponent } from "react";
import { Paper, Box, Theme, Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./utils/muiTheme";
import { Navbar } from "./components";
import { Home, NotFound, ComingSoon } from "./pages";

const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" width="100%" height="100%">
        <Navbar />
        <Paper
          sx={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            bgcolor: (theme) => theme.palette.background.default,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Paper>
        <Box
          width="100%"
          height={30}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={(theme: Theme) => ({
            background: theme.palette.primary.main,
          })}
        >
          <Typography>All rights reserved.</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
