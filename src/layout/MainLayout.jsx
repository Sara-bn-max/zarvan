import React from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Content from "../components/content/Content";
import Menu from "../components/manu/Menu";
import NavBar from "../components/nav/NavBar";
import BanksInfoPage from "../pages/BanksInfoPage/BanksInfoPage";
import "./mainStyle.css";

export default function MainLayout() {
  return (
    <>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <div className="customBox">
          <NavBar />
          <div className="handleFlex">
            <Menu />
            <BanksInfoPage />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
