import { SxProps, Typography } from "@mui/material";

interface SubHeaderProps {
  children: string;
  additionalStyles: SxProps;
}

function SubHeader({ children, additionalStyles }: SubHeaderProps) {
  return (
    <Typography
      variant="h5"
      component="h2"
      fontWeight={500}
      color="white"
      sx={{ ...additionalStyles }}
    >
      {children}
    </Typography>
  );
}
export default SubHeader;
