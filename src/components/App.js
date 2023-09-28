import Navbar from "./Navbar";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";
import Home from "./Home";
import DonateBlood from "./DonateBlood";
import FindDonor from "./FindDonor";
import BloodBanks from "./BloodBanks";
import IcuBeds from "./IcuBeds";
import DonorLogin from "./DonorLogin";
import BloodBankLogin from "./BloodBankLogin";
import DonorSignup from "./DonorSignup";
// import Nav from "./Nav";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/donor-login" />;
};

const CommonRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? <Navigate to="/" /> : children;
};

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar />
      {/* <Nav /> */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route
            path="/donate-blood"
            element={
              <PrivateRoute>
                <DonateBlood />
              </PrivateRoute>
            }
          />
          <Route
            path="/find-donor"
            element={
              <PrivateRoute>
                <FindDonor />
              </PrivateRoute>
            }
          />
          <Route
            path="/blood-banks"
            element={
              <PrivateRoute>
                <BloodBanks />
              </PrivateRoute>
            }
          />
          <Route
            path="/icu-beds"
            element={
              <PrivateRoute>
                <IcuBeds />
              </PrivateRoute>
            }
          />
          {/* <Route path="/nearest-hospital" element={<NearestHospital />} /> */}
          <Route
            path="/donor-login"
            element={
              <CommonRoute>
                <DonorLogin />
              </CommonRoute>
            }
          />
          <Route path="/blood-bank-login" element={<BloodBankLogin />} />
          <Route path="/donor-signup" element={<DonorSignup />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
