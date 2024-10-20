import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import baseURL from "../../api/baseURL";
import UserContextTypes from "../../types/UserDataContextTypes";
import { useContext } from "react";
import UserDataContext from "../../context/UserDataContext";

// Type for the sales data
interface SalesData {
  _id: string; // The date in 'YYYY-MM-DD' format
  totalQuantity: number;
}

// Helper function to convert date to weekday
const getWeekdayName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" }); // Converts date to weekday name
};

const WeeklyPurchasesChart = () => {
  const { userData }: UserContextTypes = useContext(UserDataContext);

  // Fetch weekly sold products
  const {
    data: weeklySoldProducts,
    isLoading,
    error,
  } = useQuery<SalesData[]>({
    queryKey: ["weekly-purchases", userData?._id],
    queryFn: async () => {
      const response = await axios.get(
        baseURL + "invoices/getWeeklyPurchases/" + userData?._id
      );
      return response.data; // Return the data
    },
  });

  // console.log(weeklySoldProducts)

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error loading sales data:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  // Map the data to include the weekday name
  const dataWithWeekdays = weeklySoldProducts?.map((sale) => ({
    ...sale,
    day: getWeekdayName(sale._id), // Convert _id (date) to the day name
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={dataWithWeekdays}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorQuantity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#444" strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          stroke="#ccc"
          tick={{ fill: "#ccc" }}
          tickLine={false}
        />{" "}
        {/* Display day names */}
        <YAxis stroke="#ccc" tick={{ fill: "#ccc" }} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#333",
            borderColor: "#555",
            color: "#fff",
          }}
        />
        <Legend verticalAlign="top" wrapperStyle={{ color: "#ccc" }} />
        <Area
          type="monotone"
          dataKey="totalQuantity"
          name="Products Sold"
          stroke="#8884d8"
          fill="url(#colorQuantity)"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WeeklyPurchasesChart;
