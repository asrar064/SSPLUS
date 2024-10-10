import { Box, CircularProgress } from "@mui/material";
import { ColFlex, RowFlex } from "../theme/style_extentions/Flex";
import GlobalModal from "./ui/Modal";
import StyledButton from "./ui/StyledButton";
import StyledInput from "./ui/StyledInput";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import baseURL from "../api/baseURL";
import { ProductProps } from "../types/ProductProps";
import SnackbarContext from "../context/SnackbarContext";
import { SnackBarContextTypes } from "../types/SnackbarTypes";
import { FormatDateToYYYYMMDD } from "../utils/FormatToDMY";

interface EditStockModalProps {
  title: string;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  product: ProductProps;
}

function EditStockModal({
  title,
  openModal,
  setOpenModal,
  product,
}: EditStockModalProps) {
  const QC = useQueryClient();

  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);

  const [name, setName] = useState<string>(product?.name);
  const [price, setPrice] = useState<number>(product?.price);
  const [expiryDate, setExpiryDate] = useState<string>(product?.expiryDate);
  const [quantity, setQuantity] = useState<number>(product?.quantity);
  const [gst, setGst] = useState<number>(product?.gst);

  const { mutate: updateProduct, status: updateProductStatus } = useMutation({
    mutationKey: ["Updated Product" + product?._id],
    mutationFn: async (data: ProductProps) => {
      return axios.put(baseURL + "products/" + product?._id, data);
    },
    onSuccess: (data) => {
      console.log(data);
      setOpenSnack({
        open: true,
        message: "Product edited successfully",
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

  function UpdateProduct(e: FormEvent) {
    e.preventDefault();
    const productData: any = {
      name,
      //   qrNumber,
      price,
      expiryDate,
      gst,
      //   owner: userData?._id,
      //   category,
      //   picture,
      quantity,
    };
    updateProduct(productData);
    // console.log(productData);
  }

  useEffect(() => {
    const clearForm = () => {
      setName(product?.name);
      setPrice(product?.price);
      setExpiryDate(product?.expiryDate);
      setQuantity(product?.quantity);
      setGst(product?.gst);
    }
    clearForm()
  }, [product])

  return (
    <GlobalModal
      headerText={title}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      <Box
        component={"form"}
        onSubmit={UpdateProduct}
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
        {/* Add Prod Form Rows */}
        <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
          <StyledInput
            onChange={(e) => setName(e.target.value)}
            required
            defaultValue={product?.name}
            fullWidth
            type="text"
            placeholder="Product Name"
          />
        </Box>
        <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
          <StyledInput
            defaultValue={product?.price}
            onChange={(e) => setPrice((e.target as any).value)}
            required
            fullWidth
            type="number"
            placeholder="Price"
          />
          <StyledInput
            defaultValue={product?.gst}
            onChange={(e) => setGst((e.target as any).value)}
            required
            fullWidth
            type="number"
            placeholder="GST (%)"
          />
        </Box>

        <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
          <StyledInput
            onChange={(e) => setQuantity((e.target as any).value)}
            defaultValue={product?.quantity}
            required
            fullWidth
            type="number"
            placeholder="Quantity"
          />
          <StyledInput
            onChange={(e) => setExpiryDate(e.target.value)}
            defaultValue={FormatDateToYYYYMMDD(product?.expiryDate)}
            required
            fullWidth
            type="date"
            placeholder="Expriy Date"
          />
        </Box>
        <StyledButton
          type="submit"
          text={
            updateProductStatus === "pending" ? (
              <CircularProgress size={15} sx={{ color: "white" }} />
            ) : (
              "Save Changes"
            )
          }
          additonalStyles={{
            mt: 1,
          }}
        />
      </Box>
    </GlobalModal>
  );
}

export default EditStockModal;
