import { useState, useLayoutEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navBarStyle.css";
import { Image } from "react-bootstrap";
import logo from "../../assets/images/logo-zarvan.png";
import { Geo, Person, Translate } from "react-bootstrap-icons";

export default function NavBar(props) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [token, setToken] = useState(null);
  const [langId, setLangId] = useState(null);
  const [langName, setLangName] = useState(null);
  const [centerId, setCenterId] = useState(null);
  const [centerName, setCenterName] = useState(null);
  const [userName, setUserName] = useState(null);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    const configs = JSON.parse(localStorage.getItem("configs"));
    const user =  JSON.parse(localStorage.getItem("user"));

    const lang = configs.systemLanguageId;
    const langName = configs.systemUserLanguageName;
    const center = configs.systemLanguageId;
    const centerName = configs.systemUserCenterName;
    const userName = user.userFullName;

    if (token) {
      setToken(token);
    }
    if (configs) {
      setLangId(lang);
      setLangName(langName);
      setCenterId(center);
      setCenterName(centerName);
      setUserName(userName)
    }
  }, [token]);
console.log(langId)
  const handleNavClick = (index) => {
    props.onNavClick(index);
  };
  const showLang = () => {
    if(langId === 1){
      alert(langId)
    }
  }
  return (
    <Navbar className="customNav">
      <Container className="flex-responsive">
        <Navbar.Brand href="#home">
          <Image className="logo-style" src={logo} />
        </Navbar.Brand>
        <Nav>
          <Nav.Link onClick={() => handleNavClick(0)}>مفاهیم پایه</Nav.Link>
          <Nav.Link onClick={() => handleNavClick(1)}>عملیات و اسناد</Nav.Link>
          <Nav.Link onClick={() => handleNavClick(2)}>گزارشات</Nav.Link>
          <Nav.Link onClick={() => handleNavClick(3)}>تنظیمات</Nav.Link>
          <Nav.Link onClick={() => handleNavClick(4)}>اتوماسیون اداری</Nav.Link>
        </Nav>
        <div className="flex-column"> 
          <span>
            <Person className="mx-2" varient="primary" />
            خوش آمدید {userName} عزیز!
          </span>
          <span>
            <Geo className="mx-2" varient="primary" />
            {centerName}
          </span>
          <span>
            <Translate className="mx-2" varient="primary" />
            {langName}
          </span>
        </div>
      </Container>
    </Navbar>
  );
}
