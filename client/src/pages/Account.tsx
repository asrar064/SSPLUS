import { useContext, useState } from "react";
import PageShell from "../components/PageShell";
import UserDataContext from "../context/UserDataContext";
import UserContextTypes from "../types/UserDataContextTypes";
import { Box, Typography } from "@mui/material";
import { ColFlex, RowFlex } from "../theme/style_extentions/Flex";
import StyledButton from "../components/ui/StyledButton";
import { Edit } from "@mui/icons-material";
import EditAccountDetailsModal from "../components/EditAccountDetailsModal";
import { UserTypes } from "../types/UserTypes";

function Account() {
  const { userData }: UserContextTypes = useContext(UserDataContext);
  const [openEditAccountModal, setOpenEditAccountModal] =
    useState<boolean>(false);

  return (
    <PageShell headerText="Account Details" contentGap={5}>
      <EditAccountDetailsModal
        openModal={openEditAccountModal}
        setOpenModal={setOpenEditAccountModal}
        accountDetails={userData as UserTypes}
        title="Edit Account Details"
      />
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
      <Box sx={{ width: "100%", ...RowFlex }}></Box>
      <StyledButton
        onClick={() => setOpenEditAccountModal(true)}
        startIcon={<Edit sx={{ mr: 1 }} />}
        additonalStyles={{
          backgroundColor: "white",
          color: "black",
          p: 1,
          px: 3,
          width: "30%",
          ml: "auto",
        }}
        text={"Edit Account Details"}
      />
    </PageShell>
  );
}

export default Account;
