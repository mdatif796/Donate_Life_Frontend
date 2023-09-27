import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./providers/authProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </AuthProvider>
    <ToastContainer autoClose="1000" position="bottom-left" />
  </React.StrictMode>
);
