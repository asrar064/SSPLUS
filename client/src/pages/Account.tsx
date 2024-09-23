import { useContext } from "react";
import PageShell from "../components/PageShell";
import UserDataContext from "../context/UserDataContext";
import UserContextTypes from "../types/UserDataContextTypes";
import { Box, Typography } from "@mui/material";
import { ColFlex } from "../theme/style_extentions/Flex";

function Account() {
  const { userData }: UserContextTypes = useContext(UserDataContext);

  return (
    <PageShell headerText="Account Details" contentGap={5}>
      <Box sx={{ ...ColFlex, alignItems: "flex-start" }}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Owner name
        </Typography>
        <Typography variant="h5" sx={{ color: "white", fontWeight: 500 }}>
          {userData?.name}
        </Typography>
      </Box>
      <Box sx={{ ...ColFlex, alignItems: "flex-start" }}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Owner email
        </Typography>
        <Typography variant="h5" sx={{ color: "white", fontWeight: 500 }}>
          {userData?.email}
        </Typography>
      </Box>

      {/* Store Details */}

      <Box sx={{ ...ColFlex, alignItems: "flex-start" }}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Store name
        </Typography>
        <Typography variant="h5" sx={{ color: "white", fontWeight: 500 }}>
          {userData?.storeName}
        </Typography>
      </Box>
      <Box sx={{ ...ColFlex, alignItems: "flex-start" }}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Store location
        </Typography>
        <Typography variant="h5" sx={{ color: "white", fontWeight: 500 }}>
          {userData?.storeAddress}
        </Typography>
      </Box>
      <Box sx={{ ...ColFlex, alignItems: "flex-start" }}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Store contact
        </Typography>
        <Typography variant="h5" sx={{ color: "white", fontWeight: 500 }}>
          {userData?.phone}
        </Typography>
      </Box>
    </PageShell>
  );
}

export default Account;
