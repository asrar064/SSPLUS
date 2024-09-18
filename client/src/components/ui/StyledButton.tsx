import { Button, ButtonProps, SxProps } from "@mui/material";

interface StyledButtonProps extends ButtonProps {
  text: string;
  additonalStyles?: SxProps;
}

function StyledButton({ text, additonalStyles, ...rest }: StyledButtonProps) {
  return (
    <Button
      sx={{
        width: "100%",
        backgroundColor: "#006FFD",
        color: "white",
        borderRadius: "10px",
        fontWeight: 600,
        p: 1.5,
        ...additonalStyles,
      }}
      {...rest}
      variant="contained"
    >
      {text}
    </Button>
  );
}

export default StyledButton;
