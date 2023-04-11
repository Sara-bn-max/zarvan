import {useState} from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Content from "../components/content/Content";
import Menu from "../components/manu/Menu";
import BanksInfoPage from "../pages/BanksInfoPage/BanksInfoPage";
import "./mainStyle.css";
import NavBar from "../components/nav/NavBar";
import { MenuButtonWideFill } from "react-bootstrap-icons";

export default function MainLayout() {
  
  const [indexOfMenu, setIndexOfMenu] = useState(null);
  const [openMenu, setopenMenu] = useState(false)


  const handleNavClick = (index) => {
    setIndexOfMenu(index)
  }
  const handleMenu = () => {
    setopenMenu(!openMenu)
    console.log(openMenu)
  }
  
  return (
    <>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <div className="customBox">
          <NavBar onNavClick={handleNavClick} />
          <div className="handleFlex">
            <div className="mobile-menu" onClick={handleMenu} >
            <MenuButtonWideFill />
            </div>
            <Menu indexOfMenu={indexOfMenu} openMenu={openMenu} />
            <BanksInfoPage />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
