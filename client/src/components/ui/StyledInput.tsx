import { TextField, TextFieldProps } from "@mui/material";

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
          // Change the color of the date icon
          "& input[type='date']::-webkit-calendar-picker-indicator": {
            filter: "invert(1)",  // Inverts color to make the icon white
          },
        },
      }}
      {...rest}
    />
  );
}

export default StyledInput;
