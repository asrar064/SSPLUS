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
        maxHeight: "90vh",
        overflow: "auto", // Disable scrolling on the main box
        gap: contentGap,
        p: 5,
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for WebKit browsers
        },
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
      }}
    >
      {headerText && <PageHeader>{headerText}</PageHeader>}
      {children}
    </Box>
  );
}

export default PageShell;
