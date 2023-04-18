import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globalStyle.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import { AuthProvider } from "./contexts/auth-context";
import BanksInfoPage from "./pages/BanksInfoPage/BanksInfoPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <React.StrictMode>
          <AuthProvider>
            <Routes>
              <Route index element={<BanksInfoPage />} path="/ACCBank" />
              <Route index element={<LoginPage />} path="/" />
            </Routes>
          </AuthProvider>
        </React.StrictMode>
      </BrowserRouter>
    </div>
  );
}

export default App;
