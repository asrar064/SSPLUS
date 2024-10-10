import { useContext, useRef } from "react";
import UserDataContext from "../context/UserDataContext";
import UserContextTypes from "../types/UserDataContextTypes";
import { Box, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import PageShell from "../components/PageShell";
import { ColFlex } from "../theme/style_extentions/Flex";

function Invoice() {
  const { userData }: UserContextTypes = useContext(UserDataContext);
  const params = useLocation();
  const invoice = params.state.invoice;

  const printRef = useRef<HTMLDivElement | null>(null); // Ref for the invoice content

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow && printRef.current) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice</title>
            <style>
              body { font-family: Arial, sans-serif; }
              h1, h2, h6 { color: #333; }
              .invoice { margin: 20px; }
            </style>
          </head>
          <body>
            <div class="invoice">${printRef.current.innerHTML}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <PageShell headerText="Purchase Invoice">
      <Box
        ref={printRef} // Attach the ref here
        sx={{ color: "white", ...ColFlex, alignItems: "flex-start", gap: 1 }}
      >
        <Typography variant="h2">Invoice / Bill</Typography>
        <Typography variant="h6">Invoice ID: {invoice?._id}</Typography>
        <Typography variant="h6">
          Product Name: {invoice?.product?.name}
        </Typography>
        <Typography variant="h6">Quantity: {invoice?.quantity}</Typography>
        <Typography variant="h6">
          Total Amount: ₹{invoice?.totalPrice}
        </Typography>
        <Typography variant="h6">GST (Included): {invoice?.product?.gst}%</Typography>
        <Typography variant="h6">Payment Status: Successful</Typography>
        <Typography variant="h6">
          Payment Date: {new Date(invoice?.createdAt).toLocaleString()}
        </Typography>
        <Typography sx={{ mt: 1 }} variant="h6">
          Bought from - {userData?.storeName} - {userData?.phone}
        </Typography>
        <Typography variant="h6">{userData?.storeAddress}</Typography>

        <Button onClick={handlePrint} variant="contained" sx={{ mt: 2, color: 'white', fontWeight: 600 }}>
          Print Invoice
        </Button>
      </Box>
    </PageShell>
  );
}

export default Invoice;
