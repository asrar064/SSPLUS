import { PaletteMode, ThemeProvider } from "@mui/material";
import CoreRouter from "./router/CoreRouter";
import UserDataContext from "./context/UserDataContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserTypes } from "./types/UserTypes";
import { SnackbarTypes } from "./types/SnackbarTypes";
import ProjectTheme from "./theme/MuiTheme";
import GlobalSnackbar from "./components/ui/GlobalSnackbar";

function App() {
  const [themeMode] = useState<PaletteMode>("dark");
  const [userData, setUserData] = useState<UserTypes>();
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState<SnackbarTypes>({
    open: false,
    message: "no message",
    severity: "success",
  });

  return (
    <ThemeProvider theme={ProjectTheme(themeMode)}>
      <UserDataContext.Provider value={{ userData, setUserData }}>
      <GlobalSnackbar value={{ openSnack, setOpenSnack }} />
        <CoreRouter />
      </UserDataContext.Provider>
    </ThemeProvider>
  );
}

export default App;
