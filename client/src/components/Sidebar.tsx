import { Avatar, Box, Typography } from "@mui/material";
import StyledButton from "./ui/StyledButton";
import {
  AccountBox,
  Analytics,
  Category,
  Dashboard,
  Inventory,
  PowerSettingsNew,
} from "@mui/icons-material";
import { ColFlex, RowFlex } from "../theme/style_extentions/Flex";
import UserDataContext from "../context/UserDataContext";
import { useContext } from "react";
import UserContextTypes from "../types/UserDataContextTypes";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import isXSmall from "../utils/isXSmall";

function Sidebar() {
  const { userData, setUserData }: UserContextTypes =
    useContext(UserDataContext);

  const { isXS } = isXSmall();

  const navigate = useNavigate();
  const { deleteFromLs } = useLocalStorage();

  function Logout() {
    deleteFromLs("storeAdmin");
    setUserData!(undefined);
    navigate("/");
  }

  const appPages = [
    {
      name: "Dashboard",
      path: "/store",
      icon: <Dashboard sx={{ mr: 2.5 }} />,
    },
    {
      name: "All Products",
      path: "all-products",
      icon: <Inventory sx={{ mr: 2.5 }} />,
    },
    {
      name: "Categories",
      path: "categories",
      icon: <Category sx={{ mr: 2.5 }} />,
    },
    {
      name: "Statistics",
      path: "statistics",
      icon: <Analytics sx={{ mr: 2.5 }} />,
    },
    {
      name: "Account",
      path: "account",
      icon: <AccountBox sx={{ mr: 2.5 }} />,
    },
  ];

  return (
    <Box
      sx={{
        ...ColFlex,
        justifyContent: "space-between",
        width: "25%",
        height: isXS ? "100vh" : "90vh",
        borderRight: "2px solid lightgrey",
        py: 2.5,
      }}
    >
      {/* Pages */}
      <Box sx={{ width: "100%", ...ColFlex, marginTop: "10%" }}>
        {!isXS
          ? appPages.map((page: any, index: number) => {
              return (
                <StyledButton
                  key={index}
                  onClick={() => navigate(page.path)}
                  sx={{
                    width: "100%",
                    py: 2,
                    justifyContent: "flex-start",
                    pl: 5,
                    color: "white",
                  }}
                  startIcon={page?.icon}
                  variant="text"
                  text={page.name}
                />
              );
            })
          : appPages.map((page: any, index: number) => {
              return (
                <StyledButton
                  key={index}
                  onClick={() => navigate(page.path)}
                  sx={{
                    width: "100%",
                    py: 2,
                    justifyContent: "flex-start",
                    pl: isXS ? "70%" : 5,
                    color: "white",
                  }}
                  startIcon={page?.icon}
                  variant="text"
                  text={isXS ? "" : page.name}
                />
              );
            })}
      </Box>
      {/* Account Box */}
      <Box sx={{ ...RowFlex, gap: 5, scale: 0.8 }}>
        {!isXS && <Avatar sx={{ width: "75px", height: "75px" }} />}
        <Box sx={{ ...ColFlex, gap: 1 }}>
          {!isXS && (
            <Typography variant="h6" sx={{ color: "white" }}>
              {userData?.name}
            </Typography>
          )}
          <StyledButton
            startIcon={isXS && <PowerSettingsNew sx={{ mr: 2.5 }} />}
            onClick={Logout}
            additonalStyles={{
              p: 0.75,
              backgroundColor: isXS ? "transparent" : "error.dark",
              pl: isXS ? "110%" : 0,
            }}
            text={isXS ? "" : "Logout"}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
