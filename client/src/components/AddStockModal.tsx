import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
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

function AddStockModal({ title, openModal, setOpenModal }: AddStockModalProps) {
  const [formView, setFormView] = useState<boolean>(false);

  const QC = useQueryClient();

  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);
  const { userData }: UserContextTypes = useContext(UserDataContext);

  const [name, setName] = useState<string>("");
  const [qrNumber, setQrNumber] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [demandInMonth, setDemandInMonth] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  function LiveDp(event: any) {
    // setProfilePic(event.target.files[0])
    // console.log(profilePic)
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        setPicture(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  const { data: categories } = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => {
      return axios.get(baseURL + "categories");
    },
    select: (data) => {
      return data.data;
    },
  });

  const { mutate: addProduct, status: addProductStatus } = useMutation({
    mutationKey: ["SignupData"],
    mutationFn: async (data: ProductProps) => {
      return axios.post(baseURL + "products", data);
    },
    onSuccess: (data) => {
      console.log(data);
      setOpenSnack({
        open: true,
        message: "Product added successfully",
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

  function AddProduct(e: FormEvent) {
    e.preventDefault();
    const productData: ProductProps = {
      name,
      qrNumber,
      price,
      demandInMonth,
      expiryDate,
      owner: userData?._id,
      category,
      picture,
      quantity,
    };
    addProduct(productData);
    // console.log(productData);
  }

  useEffect(() => {
    if (!openModal) {
      setFormView(false);
      setName("");
      setQrNumber("");
      setPrice(0);
      setDemandInMonth("");
      setExpiryDate("");
      setCategory("");
      setPicture("");
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
          onSubmit={AddProduct}
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
              fullWidth
              type="text"
              placeholder="Product Name"
            />
            <StyledInput
              value={qrNumber}
              onChange={(e) => setQrNumber(e.target.value)}
              required
              fullWidth
              type="text"
              placeholder="QR Number"
            />
          </Box>
          <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
            <StyledInput
              onChange={(e) => setPrice((e.target as any).value)}
              required
              fullWidth
              type="number"
              placeholder="Price"
            />
            <FormControl fullWidth>
              <InputLabel id="product category">Category</InputLabel>
              <Select
                labelId="product category"
                id="product category select"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.length &&
                  categories.map((category: any) => {
                    return (
                      <MenuItem key={category?._id} value={category?._id}>
                        {category?.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
            <Button
              sx={{
                width: "95%",
                backgroundColor: "#006FFD",
                color: "white",
                borderRadius: "10px",
                fontWeight: 600,
                p: 1.85,
              }}
              onChange={LiveDp}
              variant="outlined"
              component="label"
            >
              + Add Product Picture
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                hidden
              />
            </Button>
            <StyledInput
              onChange={(e) => setDemandInMonth((e.target as any).value)}
              required
              fullWidth
              type="text"
              placeholder="Demand In Month"
            />
          </Box>

          <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
            <StyledInput
              onChange={(e) => setQuantity((e.target as any).value)}
              required
              fullWidth
              type="number"
              placeholder="Quantity"
            />
            <StyledInput
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              fullWidth
              type="date"
              placeholder="Expriy Date"
            />
          </Box>
          <StyledButton
            type="submit"
            text={
              addProductStatus === "pending" ? (
                <CircularProgress size={15} sx={{ color: "white" }} />
              ) : (
                "Add Product"
              )
            }
            additonalStyles={{
              mt: 1,
            }}
          />
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
            }}
          />
        </Box>
      )}
    </GlobalModal>
  );
}

export default AddStockModal;
