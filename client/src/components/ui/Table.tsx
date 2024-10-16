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
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
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
import StyledInput from "./StyledInput";
import isXSmall from "../../utils/isXSmall";

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

  const [searchTerm, setSearchTerm] = useState<string>(""); // For storing search input
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // For storing selected category

  const QC = useQueryClient();

  const { isXS } = isXSmall();

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

  // Function to filter products based on the search term and category
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        {/* Options Box */}
        <Box
          sx={{
            ...RowFlex,
            width: isXS ? "100%" :"75%",
            gap: 1.5,
            justifyContent: "flex-start",
          }}
        >
          {/* Search Input */}
          <Box sx={{ width: "40%", my: 2.5 }}>
            <StyledInput
              placeholder="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
            />
          </Box>

          {/* Category Filter */}
          <FormControl sx={{ minWidth: 200, ml: 2.5 }}>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              sx={{ borderRadius: "10px" }}
              labelId="category-filter-label"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <SelectMenuItem value="">
                <em>All Categories</em>
              </SelectMenuItem>
              {categories?.map((category: any) => (
                <SelectMenuItem key={category._id} value={category._id}>
                  {category.name}
                </SelectMenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Table sx={{ minWidth: 650 }} aria-label="TM's table">
          <TableHead>
            <TableRow>
              <TableCell>Picture</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">GST (%)</TableCell>
              <TableCell align="center">QR Code</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product) => (
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
                        src={"/package-default.png"} // Static Image due to Free Server Not Letting File Saves.
                        // src={"http://localhost:3000/" + product?.picture}
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
                  <TableCell align="center">
                    {product.gst}%
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
