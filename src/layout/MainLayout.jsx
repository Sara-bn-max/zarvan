import { useState } from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Menu from "../components/manu/Menu";
import "./mainStyle.css";
import NavBar from "../components/nav/NavBar";
import { List } from "react-bootstrap-icons";
import Routings from "../components/routing/Routings";
import { useLocation } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import { useAuthState } from "../contexts/auth-context";

export default function MainLayout() {
  const [openMenu, setOpenMenu] = useState(false); // state variable for menu open/close
  const [indexOfMenu, setIndexOfMenu] = useState(null);

  const handleNavClick = (index) => {
    setIndexOfMenu(index);
  };
  const { token } = useAuthState()

  const handleMenuClick = () => {
    setOpenMenu(!openMenu); // toggle the state variable
  };

  const location = useLocation();
  const currentUrl = location.pathname;
  const showNavAndSidebar =  currentUrl !== "/";
  return (
    <>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        {token ? (
          <div className="customBox">
            <div className="mobile-menu" onClick={handleMenuClick}>
              <List />
            </div>
            <NavBar onNavClick={handleNavClick} />
            <div className="handleFlex">
              <Menu
                indexOfMenu={indexOfMenu}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
              <div className="routing-container">
                <Routings />
              </div>
            </div>
          </div>        ) : (
          <LoginPage />
          //sarah
        )}
      </ThemeProvider>
    </>
  );
}
