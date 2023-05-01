import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globalStyle.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import { useAuthState } from "./contexts/auth-context";
import BanksInfoPage from "./pages/BanksInfoPage/BanksInfoPage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  const { token } = useAuthState();
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={!token ? <LoginPage /> : <BanksInfoPage />} />
        <Route path="/ACCBank" element={<PrivateRoute component={<BanksInfoPage />} />} />
      </Routes>
    </div>
  );
}

export default App;
