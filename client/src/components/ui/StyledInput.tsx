import { TextField, TextFieldProps } from "@mui/material";

// interface StyledInputProps extends TextFieldProps {

// }

function StyledInput({ ...rest }: TextFieldProps) {
  return (
    <TextField
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: "2.5px",
            borderRadius: "10px",
          },
        },
      }}
      {...rest}
    />
  );
}

export default StyledInput;
