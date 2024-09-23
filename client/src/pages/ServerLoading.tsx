import { Box, LinearProgress, Typography } from "@mui/material";
import { ColFlex } from "../theme/style_extentions/Flex";

function ServerLoading() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        ...ColFlex,
        backgroundColor: "#040604",
        gap: 2.5,
      }}
    >
      <Box
        component={"img"}
        src="/loading-animation.gif"
        sx={{ width: "25%", height: "auto" }}
      />
      {/* <Box sx={{...ColFlex, position:'absolute',zIndex:999, width:'100%', height:'100%', backgroundColor:"rgba(0 0 0 / 0.47)"}} > */}
      <LinearProgress sx={{ width: "25%" }} color="secondary" />
      <Typography variant="h5" sx={{ fontFamily: "Poppins", color: "white" }}>
        waiting on the server 🥱
      </Typography>
      {/* </Box> */}
    </Box>
  );
}

export default ServerLoading;
