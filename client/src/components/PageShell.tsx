import { Box } from "@mui/material";
import { ReactNode } from "react";
import { ColFlex } from "../theme/style_extentions/Flex";
import PageHeader from "./ui/PageHeader";

interface PageShellProps {
  children: ReactNode;
  headerText?: string;
  contentGap?: number;
}

function PageShell({ children, headerText, contentGap = 2.5 }: PageShellProps) {
  return (
    <Box
      sx={{
        ...ColFlex,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        minHeight: "90vh",
        overflow: "auto",
        gap: contentGap,
        p: 5,
      }}
    >
      {headerText && <PageHeader>{headerText}</PageHeader>}
      {children}
    </Box>
  );
}

export default PageShell;
