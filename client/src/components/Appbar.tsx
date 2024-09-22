import { Box } from "@mui/material";
import { RowFlex } from "../theme/style_extentions/Flex";
import StyledButton from "./ui/StyledButton";
import { Inventory, LocalOffer } from "@mui/icons-material";
import { useState } from "react";
import AddStockModal from "./AddStockModal";

function Appbar() {
  const [openAddStockModal, setOpenAddStockModal] = useState<boolean>(false);
  // const [openSellProductModal, setOpenSellProductModal] =
  //   useState<boolean>(false);

  return (
    <Box
      sx={{
        ...RowFlex,
        justifyContent: "space-between",
        px: 3,
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
      <Box sx={{ ...RowFlex, gap: 5, width: "30%" }}>
        {/* <StyledInput placeholder="Search Products" /> */}
        <StyledButton
        onClick={() => setOpenAddStockModal(true)}
          startIcon={<Inventory sx={{ mr: 1 }} />}
          additonalStyles={{
            backgroundColor: "white",
            color: "black",
            p: 1,
            px: 3,
            width: "100%",
          }}
          text={"Add Stock"}
        />
        <AddStockModal title="Add Stock" openModal={openAddStockModal} setOpenModal={setOpenAddStockModal} />
        <StyledButton
          startIcon={<LocalOffer sx={{ mr: 1 }} />}
          additonalStyles={{
            backgroundColor: "white",
            color: "black",
            p: 1,
            px: 3,
            width: "100%",
          }}
          text={"Sell Items"}
        />
      </Box>
    </Box>
  );
}

export default Appbar;
