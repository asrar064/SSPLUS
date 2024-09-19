import { Avatar, Box, Typography } from "@mui/material";
import StyledButton from "./ui/StyledButton";
import {
  AccountBox,
  Analytics,
  Category,
  Dashboard,
  Inventory,
} from "@mui/icons-material";
import { ColFlex, RowFlex } from "../theme/style_extentions/Flex";
import UserDataContext from "../context/UserDataContext";
import { useContext } from "react";
import UserContextTypes from "../types/UserDataContextTypes";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { userData }: UserContextTypes =
    useContext(UserDataContext);

  const navigate = useNavigate();

  const appPages = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard sx={{ mr: 2.5 }} />,
    },
    {
      name: "All Products",
      path: "/all-products",
      icon: <Inventory sx={{ mr: 2.5 }} />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <Category sx={{ mr: 2.5 }} />,
    },
    {
      name: "Statistics",
      path: "/statistics",
      icon: <Analytics sx={{ mr: 2.5 }} />,
    },
    {
      name: "Account",
      path: "/account",
      icon: <AccountBox sx={{ mr: 2.5 }} />,
    },
  ];

  return (
    <Box
      sx={{
        ...ColFlex,
        justifyContent: "space-between",
        width: "25%",
        height: "90vh",
        borderRight: "2px solid lightgrey",
        py: 2.5,
      }}
    >
      {/* Pages */}
      <Box sx={{ width: "100%", ...ColFlex, marginTop: "10%" }}>
        {appPages.map((page: any) => {
          return (
            <StyledButton
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
        })}
      </Box>
      {/* Account Box */}
      <Box sx={{ ...RowFlex, gap: 5, scale: 0.8 }}>
        <Avatar sx={{ width: "75px", height: "75px" }} />
        <Box sx={{ ...ColFlex, gap: 1 }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            {userData?.name}
          </Typography>
          <StyledButton
          onClick={() => navigate("/")}
            additonalStyles={{ p: 0.75, backgroundColor: "error.dark" }}
            text={"Logout"}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
