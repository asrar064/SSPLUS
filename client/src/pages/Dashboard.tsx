import { Box, Typography } from "@mui/material";
import { RowFlex } from "../theme/style_extentions/Flex";

function Dashboard() {
  return (
    <Box
      sx={{
        ...RowFlex,
        p: 5,
      }}
    >
      <Typography color="white">Dashboard Content</Typography>
    </Box>
  );
}

export default Dashboard;
