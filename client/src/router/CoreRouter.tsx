import { useContext } from "react";
import UserContextTypes from "../types/UserDataContextTypes";
import UserDataContext from "../context/UserDataContext";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "../pages/Landing";
import { IOSExpand } from "../animation/transitions";

function CoreRouter() {
  const { userData }: UserContextTypes = useContext(UserDataContext);
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route
          path="/"
          element={
            <IOSExpand>
              <Landing />
            </IOSExpand>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default CoreRouter;
