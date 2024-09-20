import { Typography } from "@mui/material";

interface PageHeaderProps {
  children: string;
}

function PageHeader({ children }: PageHeaderProps) {
  return (
    <Typography variant="h4" component="h1" fontWeight={600} color="white">
      {children}
    </Typography>
  );
}

export default PageHeader;
