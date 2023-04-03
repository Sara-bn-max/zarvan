import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navBarStyle.css'

export default function NavBar() {
  return (
    <Navbar className='customNav'>
        <Container>
          <Navbar.Brand href="#home">logo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">مفاهیم پایه</Nav.Link>
            <Nav.Link href="#features">عملیات و اسناد</Nav.Link>
            <Nav.Link href="#pricing">گزارشات</Nav.Link>
            <Nav.Link href="#pricing">تنظیمات</Nav.Link>
            <Nav.Link href="#pricing">اتوماسیون اداری</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}