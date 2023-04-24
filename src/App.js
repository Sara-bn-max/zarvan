import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globalStyle.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import {  useAuthState } from "./contexts/auth-context";
import BanksInfoPage from "./pages/BanksInfoPage/BanksInfoPage";

function App() {
  // const { token } = useAuthState();
  return (
    <div className="App">
            <Routes>
              <Route  element={<BanksInfoPage />} path="/ACCBank" />
              <Route exact element={<LoginPage />} path="/" />
            </Routes>
    </div>
  );
}

export default App;
