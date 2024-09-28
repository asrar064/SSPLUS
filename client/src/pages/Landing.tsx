import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ColFlex, PageFlex, RowFlex } from "../theme/style_extentions/Flex";
import StyledInput from "../components/ui/StyledInput";
import StyledButton from "../components/ui/StyledButton";
import { FormEvent, useContext, useEffect, useState } from "react";
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

interface LoginDataProps {
  email: string;
  password: string;
}

function Landing() {
  const [inView, setInView] = useState(false);
  const navigate = useNavigate();

  const { setUserData }: UserContextTypes = useContext(UserDataContext);

  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);

  const { setInLs } = useLocalStorage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, status: loginStatus } = useMutation({
    mutationKey: ["LoginData"],
    mutationFn: async (data: LoginDataProps) => {
      return axios.post(baseURL + "storeAdmin/login", data);
    },
    onSuccess: (data) => {
      console.log(data);
      setUserData!(data.data.storeAdmin);
      setInLs("storeAdmin", data.data.storeAdmin);
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

  function Login(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setOpenSnack({
        open: true,
        message: "Please fill all fields",
        severity: "warning",
      });
    } else {
      const loginData = { email, password };
      login(loginData);
    }
  }

  useEffect(() => {
    const viewSetterTimeout = setTimeout(() => {
      setInView(true);
      return clearTimeout(viewSetterTimeout);
    }, 3000);
  }, []);

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
          mb: inView ? 5 : 0,
        }}
      />
      {inView && (
        <FadeIn delay={0.5} duration={0.75}>
          <Box
            component={"form"}
            onSubmit={Login}
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
              Login
            </Typography>
            <StyledInput
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              type="email"
              placeholder="Email Address"
            />
            <StyledInput
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              type="password"
              placeholder="Password"
            />
            <Typography
              onClick={() => navigate("/forgot-password")}
              sx={{ width: "100%", textAlign:"end", cursor: "pointer" }}
              // size="medium"
              variant="body2"
              fontWeight={500}
              color="error"
            >
              Forgot Password?
            </Typography>
            <StyledButton
              // onClick={Login}
              type="submit"
              text={
                loginStatus === "pending" ? (
                  <CircularProgress size={15} sx={{ color: "white" }} />
                ) : (
                  "Login"
                )
              }
              additonalStyles={{
                mt: 1,
              }}
            />
            <Box sx={{ ...RowFlex, gap: 1 }}>
              <Typography variant="body2" color={"white"}>
                Not a member ?
              </Typography>
              <Button
                onClick={() => navigate("/register")}
                variant="text"
                size="medium"
              >
                Register here
              </Button>
            </Box>
          </Box>
        </FadeIn>
      )}
    </Box>
  );
}

export default Landing;
