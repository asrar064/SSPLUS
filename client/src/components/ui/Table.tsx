import {
  MoreHoriz,
  Visibility,
  EditLocation,
  DeleteForever,
} from "@mui/icons-material";
import React, { useState } from "react";
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

// Define the TableComponent props, if any
interface TableComponentProps {
  products: ProductProps[] | [];
}

const TableComponent: React.FC<TableComponentProps> = ({ products }) => {
  // State to manage the menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For the menu anchor
  const [openMenu, setOpenMenu] = useState<boolean>(false); // To control menu visibility
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  ); // To store the selected employee

  const handleMenuOpen = (event: any, product: ProductProps) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the menu
    setOpenMenu(true); // Open the menu
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: "100%", height: "50vh" }}>
      <SubHeader additionalStyles={{ mb: 2.5 }}>Recently Restocked</SubHeader>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="TM's table">
          <TableHead>
            <TableRow>
              <TableCell>Picture</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Price</TableCell>
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
                        src={baseURL + product?.picture}
                        sx={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "white",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="center">₹ {product.price}</TableCell>
                  <TableCell align="center">{product.quantity} units</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
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
                        onClick={() => console.log(selectedProduct?.name)}
                        sx={{
                          ...RowFlex,
                          color: "info.main",
                          fontWeight: 600,
                          justifyContent: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <Visibility />
                        Add Stock
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        sx={{
                          ...RowFlex,
                          color: "warning.main",
                          fontWeight: 600,
                          justifyContent: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <EditLocation />
                        Edit Stock Details
                      </MenuItem>
                      <Divider />
                      <MenuItem
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
