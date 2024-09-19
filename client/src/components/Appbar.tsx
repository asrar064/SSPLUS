import { Box } from "@mui/material";
import { RowFlex } from "../theme/style_extentions/Flex";
import StyledButton from "./ui/StyledButton";
import { LocalOffer } from "@mui/icons-material";

function Appbar() {
  return (
    <Box
      sx={{
        ...RowFlex,
        justifyContent:"space-between",
        px:3,
        width: "100%",
        height: "10%",
        borderBottom: "2px solid lightgrey",
      }}
    >
      <Box
        component={"img"}
        src="/logo-rect.png"
        sx={{
          width: "125px",
          aspectRatio: 3,
        }}
      />
      <Box sx={{...RowFlex, gap:10}}>
        {/* <StyledInput placeholder="Search Products" /> */}
        <StyledButton startIcon={<LocalOffer sx={{mr:1}}/>} additonalStyles={{backgroundColor:"white", color:"black", p:1,px:5}} text={"Sell Items"} />
      </Box>
    </Box>
  );
}

export default Appbar;
