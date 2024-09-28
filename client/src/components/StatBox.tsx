import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { ColFlex, RowFlex } from "../theme/style_extentions/Flex";
import isXSmall from "../utils/isXSmall";

interface StatBoxProps {
  icon: ReactNode;
  title: string;
  value: string;
  width?: string;
  subtitle?: string;
  onClick?: () => void | any;
}

const StatBox = ({
  icon,
  title,
  value,
  width = "30%",
  subtitle,
  onClick,
}: StatBoxProps) => {
  const { isXS } = isXSmall();

  return (
    <Box
      sx={{
        ...ColFlex,
        width: isXS ? "100%" : width,
        color: "white",
        p: 2.5,
        border: "5px solid white",
        borderRadius: "10px",
        gap: 2,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
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
        <Box sx={{ width: "100%", ...ColFlex, alignItems: "flex-start" }}>
          <Typography variant="h4" fontWeight={600}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body1" fontWeight={600}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      <Typography variant="body1" fontWeight={600}>
        {title}
      </Typography>
    </Box>
  );
};

export default StatBox;
