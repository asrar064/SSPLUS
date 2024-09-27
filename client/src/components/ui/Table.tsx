import { MoreHoriz, DeleteForever, Add, Edit } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import {
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Table,
} from "@mui/material";
import baseURL from "../../api/baseURL";
import { RowFlex } from "../../theme/style_extentions/Flex";
import { ProductProps } from "../../types/ProductProps";
import SubHeader from "./SubHeader";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import FormatIntoKs from "../../utils/FormatIntoKs";
import EditStockModal from "../EditStockModal";
import SnackbarContext from "../../context/SnackbarContext";
import { SnackBarContextTypes } from "../../types/SnackbarTypes";

// Define the TableComponent props, if any
interface TableComponentProps {
  products: ProductProps[] | [];
  tableHeader?: string;
}

const TableComponent: React.FC<TableComponentProps> = ({
  products,
  tableHeader,
}) => {
  // State to manage the menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For the menu anchor
  const [openMenu, setOpenMenu] = useState<boolean>(false); // To control menu visibility
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  ); // To store the selected employee
  const [openEditStockModal, setOpenEditStockModal] = useState<boolean>(false);
  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);

  const QC = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => {
      return axios.get(baseURL + "categories");
    },
    select: (data) => {
      return data.data;
    },
  });

  const GetCategoryName = (categoryId: string): string | undefined => {
    const category = categories?.find((cat: any) => cat._id === categoryId);
    return category ? category.name : undefined; // returns category name or undefined if not found
  };

  // console.log(baseURL.slice(0, -7))

  const handleMenuOpen = (event: any, product: ProductProps) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the menu
    setOpenMenu(true); // Open the menu
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const { mutate: deleteProduct, status: _deleteProductStatus } = useMutation({
    mutationKey: ["Delete Product", selectedProduct?._id],
    mutationFn: async () => {
      return axios.delete(baseURL + "products/" + selectedProduct?._id);
    },
    onSuccess: (data) => {
      console.log(data);
      setOpenSnack({
        open: true,
        message: selectedProduct?.name + " was removed!",
        severity: "info",
      });
      setOpenMenu(false);
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

  // Function to handle the delete action
  function HandleDeleteProduct() {
    deleteProduct(); // Trigger the mutation
  }

  return (
    <Box sx={{ width: "100%", height: "50vh" }}>
      {tableHeader && (
        <SubHeader additionalStyles={{ mb: 2.5 }}>{tableHeader}</SubHeader>
      )}
      <EditStockModal
        product={selectedProduct as ProductProps}
        openModal={openEditStockModal}
        setOpenModal={setOpenEditStockModal}
        title="Change Stock Details"
      />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="TM's table">
          <TableHead>
            <TableRow>
              <TableCell>Picture</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">QR Code</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.length > 0 &&
              products.map((product) => (
                <TableRow
                  key={product._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Avatar
                        // src={baseURL.slice(0, -7) + product?.picture || "/package-default.png"}
                        src={"/package-default.png"} // Static Image due to Free Server Not Letting File Saves.
                        sx={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "white",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="center">
                    ₹ {FormatIntoKs(product.price)}
                  </TableCell>
                  <TableCell align="center">{product.qrNumber}</TableCell>
                  <TableCell align="center">{product.quantity} units</TableCell>
                  <TableCell align="center">
                    {GetCategoryName(product.category)}
                  </TableCell>
                  <TableCell align="center">
                    <MoreHoriz
                      sx={{ cursor: "pointer" }}
                      onClick={(e) => handleMenuOpen(e, product)} // Pass the product object
                    />
                    <Menu
                      elevation={1}
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleMenuClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          setSelectedProduct(selectedProduct);
                          setOpenEditStockModal(true);
                          setOpenMenu(false);
                        }}
                        sx={{
                          ...RowFlex,
                          color: "info.main",
                          fontWeight: 600,
                          justifyContent: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <Add />
                        Add Stock
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={() => {
                          setSelectedProduct(selectedProduct);
                          setOpenEditStockModal(true);
                          setOpenMenu(false);
                        }}
                        sx={{
                          ...RowFlex,
                          color: "warning.main",
                          fontWeight: 600,
                          justifyContent: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <Edit />
                        Change Details
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={HandleDeleteProduct}
                        sx={{
                          ...RowFlex,
                          color: "error.main",
                          fontWeight: 600,
                          justifyContent: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <DeleteForever />
                        Remove Product
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
