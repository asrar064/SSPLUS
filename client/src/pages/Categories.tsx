import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import baseURL from "../api/baseURL";
import PageShell from "../components/PageShell";
import { Box, Typography } from "@mui/material";
import { ColFlex, RowFlex } from "../theme/style_extentions/Flex";
import CategoryProps from "../types/CategoryProps";

function Categories() {
  const { data: categories } = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => {
      return axios.get(baseURL + "categories");
    },
    select: (data) => {
      return data.data as [CategoryProps];
    },
  });

  return (
    <PageShell headerText={`Product Categories (${categories ? categories?.length : 0})`}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          ...RowFlex,
          flexWrap: "wrap",
          overflow: "auto",
          gap: "3.3%",
          justifyContent: "flex-start",
        }}
      >
        {categories?.map((category: CategoryProps) => (
          <Box
            sx={{
              width: "30%",
              height: "200px",
              position: "relative",
              ...ColFlex,
              border: "5px solid white",
              borderRadius: "15px",
              backgroundImage:
                "url('/package-default.png'), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))", // Add a dark gradient
              backgroundBlendMode: "overlay", // Blend the gradient and image together
              // backgroundSize: "cover",
              backgroundPosition: "center",
              p: 5,
            }}
            key={category._id}
          >
            <Typography sx={{ color: "white", fontWeight: 600 }} variant="h5">
              {category.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </PageShell>
  );
}

export default Categories;
