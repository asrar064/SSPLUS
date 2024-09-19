// import { useContext } from "react";
// import UserContextTypes from "../types/UserDataContextTypes";
// import UserDataContext from "../context/UserDataContext";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "../pages/Landing";
import { IOSExpand, SlideInOut } from "../animation/transitions";
import Signup from "../pages/Signup";
import StoreLayout from "../layouts/StoreLayout";
import Dashboard from "../pages/Dashboard";

function CoreRouter() {
  // const { userData }: UserContextTypes = useContext(UserDataContext);
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
        <Route
          path="/register"
          element={
            <IOSExpand>
              <Signup />
            </IOSExpand>
          }
        />
        <Route path="/store" element={<StoreLayout />}>
          <Route
            index
            element={
              <SlideInOut>
                <Dashboard />
              </SlideInOut>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default CoreRouter;
