import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ColFlex, PageFlex, RowFlex } from "../theme/style_extentions/Flex";
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

interface SignupDataProps {
  name: string;
  email: string;
  password: string;
  storeName: string;
  phone: string;
  storeAddress: string;
}

function Signup() {
  const navigate = useNavigate();

  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);
  const { setUserData }: UserContextTypes = useContext(UserDataContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: signup, status: signupStatus } = useMutation({
    mutationKey: ["SignupData"],
    mutationFn: async (data: SignupDataProps) => {
      return axios.post(baseURL + "storeAdmin/signup", data);
    },
    onSuccess: (data) => {
      //   console.log(data);
      setUserData!(data.data.storeAdmin);
      navigate("/store");
    },
    onError: (err: any) => {
      setOpenSnack({
        open: true,
        message: err.response.data.message,
        severity: "error",
      });
    },
  });

  function Signup(e: FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setOpenSnack({
        open: true,
        message: "Passwords do not match!",
        severity: "warning",
      });
    } else {
      const signupData: SignupDataProps = {
        email,
        password,
        name,
        phone,
        storeName,
        storeAddress,
      };
      signup(signupData);
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
          mb: 0,
        }}
      />
      {
        <FadeIn delay={0.5} duration={0.75}>
          <Box
            component={"form"}
            onSubmit={Signup}
            sx={{
              ...ColFlex,
              overflow: "hidden",
              m: "auto",
              maxWidth: "80%",
              width: { xs: "80%", md: "60%" },
              justifyContent: "space-between",
              gap: "15px",
            }}
          >
            <Typography variant="h6" color={"white"}>
              Signup
            </Typography>
            {/* Signup Form Rows */}
            <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
              <StyledInput
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                type="text"
                placeholder="Owner Name"
              />
              <StyledInput
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                type="email"
                placeholder="Email Address"
              />
            </Box>
            <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
              <StyledInput
                onChange={(e) => setPhone(e.target.value)}
                required
                fullWidth
                type="number"
                placeholder="Phone Number"
              />
              <StyledInput
                onChange={(e) => setStoreName(e.target.value)}
                required
                fullWidth
                type="text"
                placeholder="Store Name"
              />
            </Box>
            <StyledInput
              onChange={(e) => setStoreAddress(e.target.value)}
              required
              fullWidth
              type="text"
              placeholder="Store Address"
            />
            <Box sx={{ ...RowFlex, width: "100%", gap: 1 }}>
              <StyledInput
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                type="password"
                placeholder="Password"
              />
              <StyledInput
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
                type="password"
                placeholder="Confirm Password"
              />
            </Box>
            <Typography variant="caption" color={"white"}>
              By signing up, you agree to our{" "}
              <span style={{ color: "#006FFD" }}>Terms of Service</span> and{" "}
              <span style={{ color: "#006FFD" }}>Privacy Policy</span>.
            </Typography>
            <StyledButton
              type="submit"
              text={
                signupStatus === "pending" ? (
                  <CircularProgress size={15} sx={{ color: "white" }} />
                ) : (
                  "Register"
                )
              }
              additonalStyles={{
                mt: 1,
              }}
            />
            <Box sx={{ ...RowFlex, gap: 1 }}>
              <Typography variant="body2" color={"white"}>
                Already a member ?
              </Typography>
              <Button
                onClick={() => navigate("/")}
                variant="text"
                size="medium"
              >
                Login here
              </Button>
            </Box>
          </Box>
        </FadeIn>
      }
    </Box>
  );
}

export default Signup;
