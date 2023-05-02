import { useState } from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Content from "../components/content/Content";
import Menu from "../components/manu/Menu";
import BanksInfoPage from "../pages/BanksInfoPage/BanksInfoPage";
import "./mainStyle.css";
import NavBar from "../components/nav/NavBar";
import { List, MenuButtonWideFill } from "react-bootstrap-icons";
import Routings from "../components/routing/Routings";

export default function MainLayout() {
  const [openMenu, setOpenMenu] = useState(false); // state variable for menu open/close
  const [indexOfMenu, setIndexOfMenu] = useState(null);

  const handleNavClick = (index) => {
    setIndexOfMenu(index);
  };

  const handleMenuClick = () => {
    setOpenMenu(!openMenu); // toggle the state variable
  };

  return (
    <>
    <Routings />
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <div className="customBox">
        <div className="mobile-menu"  onClick={handleMenuClick}>
              <List />
            </div>
          <NavBar onNavClick={handleNavClick} />
          <div className="handleFlex">
            <Menu indexOfMenu={indexOfMenu} openMenu={openMenu} setOpenMenu={setOpenMenu} />
            
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
