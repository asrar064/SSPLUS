import { Box, Button, Typography } from "@mui/material";
import { ColFlex, PageFlex, RowFlex } from "../theme/style_extentions/Flex";
import StyledInput from "../components/ui/StyledInput";
import StyledButton from "../components/ui/StyledButton";
import { useEffect, useState } from "react";
import { FadeIn } from "../animation/transitions";

function Landing() {
  const [inView, setInView] = useState(false);

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
              required
              fullWidth
              type="email"
              placeholder="Email Address"
            />
            <StyledInput
              required
              fullWidth
              type="password"
              placeholder="Password"
            />
            <Typography variant="caption" color={"white"}>
              By logging in, you agree to our{" "}
              <span style={{ color: "#006FFD" }}>Terms of Service</span> and{" "}
              <span style={{ color: "#006FFD" }}>Privacy Policy</span>.
            </Typography>
            <StyledButton
              text="Login"
              additonalStyles={{
                mt: 1,
              }}
            />
            <Box sx={{ ...RowFlex, gap: 1 }}>
              <Typography variant="body2" color={"white"}>
                Not a member ?
              </Typography>
              <Button variant="text" size="medium">
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
