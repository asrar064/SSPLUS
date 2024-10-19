import { Box, LinearProgress, Typography } from "@mui/material";
import { ColFlex } from "../theme/style_extentions/Flex";
import { useState, useEffect } from "react";
import { FadeIn } from "../animation/transitions";
import { AnimatePresence } from "framer-motion";

function ServerLoading() {
  // Define an array of loading messages
  const loadingMessages = [
    "Loading StockSense store...",
    "Fetching latest data...",
    "Loading inventory...",
    "Getting StockSense ready...",
    "Almost there...",
    "Preparing your dashboard...",
  ];

  // State to store the current loading message
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  // useEffect to change the message every second
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setLoadingMessage(loadingMessages[randomIndex]);
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        ...ColFlex,
        backgroundColor: "#1B1B1B",
        gap: 2.5,
      }}
    >
      <FadeIn duration={5}
        additionalStyles={{ width: '100%', height: "auto", textAlign: "center" }}
      >
        <Box
          component={"img"}
          src="/loader-box.gif"
          sx={{
            width: "25%",
            height: "auto",
            animation: "rotate 5s infinite alternate",
            "@keyframes rotate": {
              "0%": {
                transform: "rotate(0deg)",
              },
              "35%": {
                transform: "rotate(90deg)",
              },
              "75%": {
                transform: "rotate(180deg)",
              },
              "100%": {
                transform: "rotate(270deg)",
              },
            },
          }}
        />
      </FadeIn>

      <LinearProgress sx={{ width: "25%" }} color="warning" />
      <AnimatePresence mode="wait">

        <FadeIn additionalStyles={{ width: '100%', height: "auto", textAlign: "center" }} key={loadingMessage}>
          <Typography variant="h6" sx={{ fontFamily: "Poppins", color: "white" }}>
            {loadingMessage} {/* This will change every second */}
          </Typography>
        </FadeIn>
      </AnimatePresence>
    </Box>
  );
}

export default ServerLoading;
