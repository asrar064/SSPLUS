import { PaletteMode, ThemeProvider } from "@mui/material";
import CoreRouter from "./router/CoreRouter";
import UserDataContext from "./context/UserDataContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserTypes } from "./types/UserTypes";
import { SnackbarTypes } from "./types/SnackbarTypes";
import ProjectTheme from "./theme/MuiTheme";
import GlobalSnackbar from "./components/ui/GlobalSnackbar";
import SnackbarContext from "./context/SnackbarContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [themeMode] = useState<PaletteMode>("dark");
  const [userData, setUserData] = useState<UserTypes>();
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState<SnackbarTypes>({
    open: false,
    message: "no message",
    severity: "success",
  });

  const { getFromLs } = useLocalStorage();

  const AutoLogin = () => {
    const isLoggedIn = getFromLs("storeAdmin");
    if (isLoggedIn) {
      // console.log(isLoggedIn);
      setUserData(isLoggedIn);
      navigate("/store");
    }
  };

  useEffect(() => {
    AutoLogin();
  }, []);

  return (
    <ThemeProvider theme={ProjectTheme(themeMode)}>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <GlobalSnackbar value={{ openSnack, setOpenSnack }} />
        <SnackbarContext.Provider value={{ openSnack, setOpenSnack }}>
          <CoreRouter />
        </SnackbarContext.Provider>
      </UserDataContext.Provider>
    </ThemeProvider>
  );
}

export default App;
