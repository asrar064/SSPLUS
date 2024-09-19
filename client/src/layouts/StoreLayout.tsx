import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ColFlex, RowFlex } from "../theme/style_extentions/Flex";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";

function StoreLayout() {
  return (
    <Box sx={{...ColFlex,width:"100vw", height:"100vh", justifyContent:"flex-start"}}>
      <Appbar/>
      <Box sx={{...RowFlex, width:"100%"}}>
      <Sidebar/>
      <Outlet />
      </Box>
    </Box>
  );
}

export default StoreLayout;
