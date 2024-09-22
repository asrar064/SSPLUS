import { useQuery } from "@tanstack/react-query";
import PageShell from "../components/PageShell";
import TableComponent from "../components/ui/Table";
import axios from "axios";
import baseURL from "../api/baseURL";
import { useContext } from "react";
import UserDataContext from "../context/UserDataContext";
import UserContextTypes from "../types/UserDataContextTypes";

function AllProducts() {
  const { userData }: UserContextTypes = useContext(UserDataContext);

  const { data: products, status: productsStatus } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return axios.get(
        baseURL + "products/getProductsByOwnerId/" + userData?._id
      );
    },
    select: (data) => {
      return data.data;
    },
  });

  return (
    <PageShell headerText={`Store's Products (${products?.length})`}>
      {productsStatus && <TableComponent products={products} />}
    </PageShell>
  );
}

export default AllProducts;
