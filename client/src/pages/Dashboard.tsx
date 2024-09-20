import { Box, Typography } from "@mui/material";
import PageShell from "../components/PageShell";
import { CurrencyRupee, NewReleases, ShoppingBasket, ShowChart } from "@mui/icons-material";
import { ColFlex, RowFlex } from "../theme/style_extentions/Flex";
import { ReactNode } from "react";

interface StatBoxProps {
  icon: ReactNode;
  title: string;
  value: string;
}

const StatBox = ({ icon, title, value }: StatBoxProps) => {
  return (
    <Box
      sx={{
        ...ColFlex,
        width: "30%",
        color: "white",
        p: 2.5,
        border: "5px solid white",
        borderRadius: "10px",
        gap: 2,
      }}
    >
      <Box
        sx={{
          ...RowFlex,
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {icon}
        <Typography variant="h4" fontWeight={600}>
          {value}
        </Typography>
      </Box>
      <Typography variant="body1" fontWeight={600}>{title}</Typography>
    </Box>
  );
};

function Dashboard() {
  return (
    <PageShell>
      {/* Stat Box Container */}
      <Box sx={{ ...RowFlex, width: "100%", gap: 2.5 }}>
        <StatBox
          icon={<ShoppingBasket sx={{ fontSize: 40 }} />}
          title="Total Products Sold"
          value="55"
        />
        <StatBox
          icon={<CurrencyRupee sx={{ fontSize: 40 }} />}
          title="Revenue Generated"
          value="12.5k"
        />
        <StatBox
          icon={<NewReleases sx={{ fontSize: 40 }} />}
          title="New Products"
          value="10"
        />
        <StatBox
          icon={<ShowChart sx={{ fontSize: 40 }} />}
          title="Restocking Needed"
          value="10"
        />
      </Box>
    </PageShell>
  );
}

export default Dashboard;
