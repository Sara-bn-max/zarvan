import {useState} from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Content from "../components/content/Content";
import Menu from "../components/manu/Menu";
import BanksInfoPage from "../pages/BanksInfoPage/BanksInfoPage";
import "./mainStyle.css";
import NavBar from "../components/nav/NavBar";

export default function MainLayout() {
  const [indexOfMenu, setIndexOfMenu] = useState(null)
  const handleNavClick = (index) => {
    setIndexOfMenu(index)
    console.log(indexOfMenu)
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
            <Menu indexOfMenu={indexOfMenu} />
            <BanksInfoPage />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
