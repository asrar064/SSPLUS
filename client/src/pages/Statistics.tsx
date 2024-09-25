import { Box } from "@mui/material";
import PageShell from "../components/PageShell";
import { RowFlex } from "../theme/style_extentions/Flex";
import StatBox from "../components/StatBox";
import { KeyboardDoubleArrowUp, TrendingDown } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import baseURL from "../api/baseURL";
import UserDataContext from "../context/UserDataContext";
import UserContextTypes from "../types/UserDataContextTypes";
import TableComponent from "../components/ui/Table";

function Statistics() {
  const { userData }: UserContextTypes = useContext(UserDataContext);

  // Get Store's Products Query
  const { data: topSellingItem, status: _topSellingItemStatus } = useQuery({
    queryKey: ["Top Selling Product"],
    queryFn: async () => {
      return axios.get(
        baseURL + "invoices/getTopSellingProduct/" + userData?._id
      );
    },
    select: (data) => {
      return data.data;
    },
  });

  // Get Store's getLowestSellingProduct Query
  const { data: lowestSellingProduct, status: _getLowestSellingProductStatus } =
    useQuery({
      queryKey: ["Lowest Selling Product"],
      queryFn: async () => {
        return axios.get(
          baseURL + "invoices/getLowestSellingProduct/" + userData?._id
        );
      },
      select: (data) => {
        return data.data;
      },
    });

  // Get Store's Products Query
  const { data: lowStockProducts } = useQuery({
    queryKey: ["lowStockProducts"],
    queryFn: async () => {
      return axios.get(
        baseURL + "products/getLowStockProducts/" + userData?._id
      );
    },
    select: (data) => {
      return data.data;
    },
  });

  console.log(lowestSellingProduct);

  return (
    <PageShell headerText="Store's Statistics">
      <Box sx={{ ...RowFlex, width: "100%", justifyContent: "space-between" }}>
        <StatBox
          // title="Top Selling Item"
          value={topSellingItem?.topProductName}
          title={`${topSellingItem?.totalSold} units sold in the last 30 days`}
          width="47.5%"
          icon={
            <KeyboardDoubleArrowUp
              sx={{ fontSize: 50, color: "primary.main" }}
            />
          }
        />
        <StatBox
          // title="Least Bought Item"
          title={`Only ${lowestSellingProduct?.totalSold} units were sold in the last 30 days`}
          value={lowestSellingProduct?.lowestProductName}
          width="47.5%"
          icon={<TrendingDown sx={{ fontSize: 50, color: "warning.main" }} />}
        />
      </Box>
      <Box sx={{ mt: 5, width: "100%" }}>
        <TableComponent
          products={lowStockProducts}
          tableHeader={`Restocking Needed (${
            lowStockProducts ? lowStockProducts?.length : 0
          })`}
        />
      </Box>
    </PageShell>
  );
}

export default Statistics;
