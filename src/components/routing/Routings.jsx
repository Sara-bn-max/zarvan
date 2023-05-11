import {useState, useEffect} from "react";
import { useAuthState } from "../../contexts/auth-context";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/loginPage/LoginPage";
import BanksInfoPage from "../../pages/BanksInfoPage/BanksInfoPage";
import PrivateRoute from "../privateRoute/PrivateRoute";
import BranchInfoPage from "../../pages/BranchInfoPage/BranchInfoPage";

export default function Routings() {
  const { token } = useAuthState();
  return (
    <Routes>
      <Route
        exact
        path={"/"}
        element={
          token ? <PrivateRoute component={<BanksInfoPage />} /> : <LoginPage />
        }
      />
      <Route
        path="/ACCBank"
        element={<PrivateRoute component={<BanksInfoPage />} />}
      />
      <Route
        path="/ACCBankBranches"
        element={<PrivateRoute component={<BranchInfoPage />} />}
      />
    </Routes>
  );
}
