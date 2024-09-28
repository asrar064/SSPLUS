import { Box } from "@mui/material";
import { RowFlex } from "../theme/style_extentions/Flex";
import StyledButton from "./ui/StyledButton";
import { Inventory, LocalOffer } from "@mui/icons-material";
import { useState } from "react";
import AddStockModal from "./AddStockModal";
import SellStockModal from "./SellStockModal";
import isXSmall from "../utils/isXSmall";

function Appbar() {
  const [openAddStockModal, setOpenAddStockModal] = useState<boolean>(false);
  const [openSellProductModal, setOpenSellProductModal] =
    useState<boolean>(false);

  const { isXS } = isXSmall();

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
          width: isXS ? "75px" : "125px",
          aspectRatio: 3,
        }}
      />
      <Box sx={{ ...RowFlex, gap: isXS ? 0 : 5, width: isXS ? "70%" : "30%" }}>
        {/* <StyledInput placeholder="Search Products" /> */}
        <StyledButton
          onClick={() => setOpenAddStockModal(true)}
          startIcon={<Inventory sx={{ mr: isXS ? 0 : 1 }} />}
          additonalStyles={{
            backgroundColor: "white",
            color: "black",
            p: 1,
            px: 3,
            width: "100%",
            scale: isXS ? 0.75 : 1
          }}
          text={isXS ? "Add" : "Add Stock"}
          />
        <AddStockModal
          title="Add Stock"
          openModal={openAddStockModal}
          setOpenModal={setOpenAddStockModal}
          />
        <SellStockModal
          title="Sell Item"
          openModal={openSellProductModal}
          setOpenModal={setOpenSellProductModal}
          />
        <StyledButton
          onClick={() => setOpenSellProductModal(true)}
          startIcon={<LocalOffer sx={{ mr: isXS ? 0 : 1 }} />}
          additonalStyles={{
            backgroundColor: "white",
            color: "black",
            p: 1,
            px: 3,
            width: "100%",
            scale: isXS ? 0.75 : 1
          }}
          text={isXS ? "Sell" : "Sell Items"}
        />
      </Box>
    </Box>
  );
}

export default Appbar;
