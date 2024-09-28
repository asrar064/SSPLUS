import { Box, CircularProgress, Typography } from "@mui/material";
import { ColFlex, PageFlex } from "../theme/style_extentions/Flex";
import StyledInput from "../components/ui/StyledInput";
import StyledButton from "../components/ui/StyledButton";
import { FormEvent, useContext, useState } from "react";
import { FadeIn } from "../animation/transitions";
import { useMutation } from "@tanstack/react-query";
import baseURL from "../api/baseURL";
import axios from "axios";
import SnackbarContext from "../context/SnackbarContext";
import { SnackBarContextTypes } from "../types/SnackbarTypes";
import { useNavigate } from "react-router-dom";
import UserDataContext from "../context/UserDataContext";
import UserContextTypes from "../types/UserDataContextTypes";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ForgotPasswordDataProps {
  email: string;
  storeAddress: string;
}

function ForgotPassword() {
  const navigate = useNavigate();

  const { setUserData }: UserContextTypes = useContext(UserDataContext);

  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);

  const { setInLs } = useLocalStorage();

  const [email, setEmail] = useState<string>("");
  const [storeLocation, setStoreLocation] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const { mutate: recoverAccount, status: recoverAccountStatus } = useMutation({
    mutationKey: ["ForgotPasswordData"],
    mutationFn: async (data: ForgotPasswordDataProps) => {
      return axios.post(baseURL + "storeAdmin/resetPasswordWithQuestion", data);
    },
    onSuccess: (data) => {
      console.log(data);
      setUserData!(data.data);
      setInLs("storeAdmin", data.data);
      navigate("/store");
      setOpenSnack({
        open: true,
        message: "Password reset successfully",
        severity: "success",
      });
    },
    onError: (err: any) => {
      setOpenSnack({
        open: true,
        message: err.response.data.message,
        severity: "error",
      });
    },
  });

  function ForgotPassword(e: FormEvent) {
    e.preventDefault();
    if (!email || !storeLocation) {
      setOpenSnack({
        open: true,
        message: "Please fill all fields",
        severity: "warning",
      });
    } else {
      const fPData = { email, storeAddress: storeLocation, newPassword };
      console.log(fPData);
      recoverAccount(fPData);
    }
  }

  return (
    <Box
      sx={{
        ...PageFlex,
        backgroundColor: "background.default",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Box
        component={"img"}
        src="/logo-square.png"
        sx={{
          width: { sm: "20vw", md: "10vw" },
          aspectRatio: 1.5,
          mb: 5,
        }}
      />
      <FadeIn delay={0.5} duration={0.75}>
        <Box
          component={"form"}
          onSubmit={ForgotPassword}
          sx={{
            ...ColFlex,
            overflow: "hidden",
            m: "auto",
            maxWidth: "80%",
            width: { xs: "80%", md: "30%" },
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <Typography variant="h6" color={"white"}>
            Account Recovery
          </Typography>
          <StyledInput
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            type="email"
            placeholder="Email Address"
          />
          <Typography
            sx={{ width: "100%", textAlign: "start" }}
            variant="body2"
            color={"white"}
          >
            Security Question
          </Typography>
          <StyledInput
            onChange={(e) => setStoreLocation(e.target.value)}
            required
            fullWidth
            type="text"
            placeholder="What was your Store Location ?"
          />
          <StyledInput
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
            type="password"
            placeholder="Enter New Password"
          />
          <StyledButton
            // onClick={ForgotPassword}
            type="submit"
            text={
              recoverAccountStatus === "pending" ? (
                <CircularProgress size={15} sx={{ color: "white" }} />
              ) : (
                "Reset Password"
              )
            }
            additonalStyles={{
              mt: 1,
            }}
          />
        </Box>
      </FadeIn>
    </Box>
  );
}

export default ForgotPassword;
