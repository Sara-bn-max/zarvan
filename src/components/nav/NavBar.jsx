import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navBarStyle.css";
import { Image } from "react-bootstrap";
import logo from "../../assets/images/logo-zarvan.png";

export default function NavBar(props) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleNavClick = (index) => {
    props.onNavClick(index);
  };

  return (
    <Navbar className="customNav">
      <Container className="flex-responsive">
        <Navbar.Brand href="#home">
          <Image className="logo-style" src={logo} />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => handleNavClick(0)}>مفاهیم پایه</Nav.Link>
          <Nav.Link onClick={() => handleNavClick(1)}>عملیات و اسناد</Nav.Link>
          <Nav.Link onClick={() => handleNavClick(2)}>گزارشات</Nav.Link>
          <Nav.Link onClick={() => handleNavClick(3)}>تنظیمات</Nav.Link>
          <Nav.Link onClick={() => handleNavClick(4)}>اتوماسیون اداری</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
