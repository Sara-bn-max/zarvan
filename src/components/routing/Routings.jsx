
import React from "react";
import { useAuthState } from "../../contexts/auth-context";
import { Route, Routes } from "react-router-dom";
import LoginPage from '../../pages/loginPage/LoginPage'
import BanksInfoPage from '../../pages/BanksInfoPage/BanksInfoPage'
import PrivateRoute from '../privateRoute/PrivateRoute'

export default function Routings() {
    const { token } = useAuthState()
    return (
      <div className="App">
        <Routes>
          <Route exact path={"/"} element={token ? <BanksInfoPage /> : <LoginPage /> } />
          <Route path="/ACCBank" element={<PrivateRoute component={<BanksInfoPage />} />} />
        </Routes>
        
      </div>
    );
  }
  



