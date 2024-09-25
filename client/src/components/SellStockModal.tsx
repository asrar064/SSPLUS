import { Box, CircularProgress, Typography } from "@mui/material";
import { ColFlex, RowFlex } from "../theme/style_extentions/Flex";
import GlobalModal from "./ui/Modal";
import StyledButton from "./ui/StyledButton";
import StyledInput from "./ui/StyledInput";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Clear } from "@mui/icons-material";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import baseURL from "../api/baseURL";
import { ProductProps } from "../types/ProductProps";
import SnackbarContext from "../context/SnackbarContext";
import { SnackBarContextTypes } from "../types/SnackbarTypes";
import UserDataContext from "../context/UserDataContext";
import UserContextTypes from "../types/UserDataContextTypes";

interface AddStockModalProps {
  title: string;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

function SellStockModal({
  title,
  openModal,
  setOpenModal,
}: AddStockModalProps) {
  const [formView, setFormView] = useState<boolean>(false);

  const QC = useQueryClient();

  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);
  const { userData }: UserContextTypes = useContext(UserDataContext);

  const [qrNumber, setQrNumber] = useState<string>("");
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [productQuantity, setProductQuantity] = useState<number>(1);

  const { data: foundProduct, status: foundProductStatus } = useQuery({
    queryKey: [`Product - ${qrNumber}`],
    queryFn: async () => {
      return axios.get(baseURL + "products/" + qrNumber);
    },
    enabled: searchTrigger,
    select: (data) => {
      return data.data as ProductProps;
    },
  });

  function SearchProduct(e: FormEvent) {
    setSearchTrigger(true);
    e.preventDefault();
  }

  //   console.log(foundProduct);

  const { mutate: sellProduct, status: sellProductStatus } = useMutation({
    mutationKey: ["Product Sold" + foundProduct?._id],
    mutationFn: async (data: any) => {
      return axios.post(
        baseURL + "products/sellProduct/" + foundProduct?._id,
        data
      );
    },
    onSuccess: async (data) => {
      console.log(data);
      createInvoice();
      setOpenSnack({
        open: true,
        message: foundProduct?.name + " sold successfully",
        severity: "success",
      });
      setOpenModal(false);
      //   QC.invalidateQueries(["Products"]);
      QC.invalidateQueries(["Products"] as unknown as InvalidateQueryFilters);
    },
    onError: (err: any) => {
      setOpenSnack({
        open: true,
        message: err.response.data.message,
        severity: "error",
      });
    },
  });

  function SellProduct(e: FormEvent) {
    e.preventDefault();
    const sellProdData = { quantity: productQuantity };
    // console.log(sellProdData);
    sellProduct(sellProdData);
  }

  const { mutate: createInvoice, status: _createInvoiceStatus } = useMutation({
    mutationFn: async () => {
      const totalPrice = productQuantity * (foundProduct?.price || 0);
      return await axios.post(baseURL + "invoices", {
        productId: foundProduct?._id,
        quantity: productQuantity,
        totalPrice,
        owner: userData?._id,
      });
    },
    onSuccess: () => {
      setOpenSnack({
        open: true,
        message: "Invoice created successfully",
        severity: "success",
      });
      QC.invalidateQueries(["storeStats"] as unknown as InvalidateQueryFilters);
    },
    onError: (error) => {
      console.error("Error creating invoice:", error);
      // Here you can handle the error
      // For example, show an error message to the user
    },
  });

  function IncreaseQuantity() {
    // Ensure the product's available quantity is not exceeded
    if (foundProduct?.quantity && productQuantity < foundProduct.quantity) {
      setProductQuantity(productQuantity + 1);
    }
  }
  
  function ReduceQuantity() {
    // Ensure quantity doesn't go below 1
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  }
  

  useEffect(() => {
    if (foundProductStatus === "error") {
      setOpenSnack({
        open: true,
        message: "Product not found",
        severity: "error",
      });
    }
  }, [foundProduct, foundProductStatus]);

  useEffect(() => {
    if (!openModal) {
      setFormView(false);
    }
  }, [openModal]);

  return (
    <GlobalModal
      headerText={title}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      {formView ? (
        <Box
          component={"form"}
          onSubmit={SearchProduct}
          sx={{
            ...ColFlex,
            overflow: "hidden",
            m: "auto",
            p: 2.5,
            maxWidth: "90%",
            width: { xs: "80%", md: "100%" },
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          {/* Sell Prod Form Rows */}
          {!foundProduct && (
            <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
              <StyledInput
                value={qrNumber}
                onChange={(e) => setQrNumber(e.target.value)}
                required
                fullWidth
                type="text"
                placeholder="Search with QR Number"
              />
            </Box>
          )}
          {!foundProduct && (
            <StyledButton
              type="submit"
              //   disabled={foundProductStatus === "pending"}
              text={"Search"}
              //   text={
              //     foundProductStatus === "pending" ? (
              //       <CircularProgress size={15} sx={{ color: "white" }} />
              //     ) : (
              //       "Search"
              //     )
              //   }
              additonalStyles={{
                mt: 1,
              }}
            />
          )}
          {/* Searched Product */}
          {foundProduct && (
            <Box sx={{ width: "100%", ...ColFlex, gap: 2.5 }}>
              <Box
                sx={{
                  width: "100%",
                  p: 2.5,
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  ...RowFlex,
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    ...RowFlex,
                    // justifyContent: "flex-start",
                    justifyContent: "space-between",
                    gap: 5,
                    width: "60%",
                    pl: 2.5,
                  }}
                >
                  <Typography sx={{ color: "white", fontWeight: 600 }}>
                    {foundProduct?.name}
                  </Typography>
                  <Typography sx={{ color: "white", fontWeight: 600 }}>
                    ₹ {(foundProduct?.price as number) * productQuantity}
                  </Typography>
                  <Typography sx={{ color: "white", fontWeight: 600 }}>
                    {productQuantity} units
                  </Typography>
                </Box>
                <Box sx={{ ...RowFlex, gap: 1.5, width: "40%" }}>
                  <StyledButton
                    onClick={() => IncreaseQuantity()}
                    text={"+"}
                    sx={{
                      width: "50px",
                      height: "50px",
                      color: "green",
                      fontSize: 25,
                      ml: "auto",
                    }}
                  />
                  <StyledButton
                    onClick={() => ReduceQuantity()}
                    text={"-"}
                    sx={{
                      width: "50px",
                      height: "50px",
                      color: "red",
                      fontSize: 25,
                    }}
                  />
                </Box>
              </Box>
              <StyledButton
                onClick={SellProduct}
                // text="Sell Products"
                disabled={sellProductStatus === "pending"}
                text={
                  sellProductStatus === "pending" ? (
                    <CircularProgress size={15} sx={{ color: "white" }} />
                  ) : (
                    "Sell Products"
                  )
                }
                additonalStyles={{
                  mt: 1,
                }}
              />
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ ...ColFlex, width: "100%", height: "100%" }}>
          <Clear
            sx={{ color: "white", m: 2 }}
            onClick={() => setFormView(true)}
          />
          <Scanner
            styles={{ container: { width: "500px", height: "500px" } }}
            onScan={(result) => {
              //   console.log(result[0].rawValue);
              setFormView(true);
              setQrNumber(result[0].rawValue);
              setSearchTrigger(true)
            }}
          />
        </Box>
      )}
    </GlobalModal>
  );
}

export default SellStockModal;
