import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../services/authContext/Auth.Context";
import ToggleTheme from "../toggleTheme/ToggleTheme";
import "./Header.css";
const Header = () => {
  const navigate = useNavigate();
  const { token, handleUserLogout } = useContext(AuthContext);
  const isLoggedIn = Boolean(token);

  const handleNavigateHome = () => {
    navigate("/home", { replace: true });
  };
    const handleLogin = () => {
    navigate("/login");
    };
  const handleLogout = () => {
    handleUserLogout();
    toast.success("Cierre de sesion exitoso", {
      onClose: () => navigate("/home", { replace: true }),
    });
  };

  return (
    <Navbar expand="lg" data-bs-theme="dark" className="navbar-modern">
      <Container className="navbar-content">
        <Navbar.Brand onClick={handleNavigateHome} style={{ cursor: "pointer" }}>
          Juan Pablo Fernandez
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navigation" />
        <Navbar.Collapse id="main-navigation">
          <Nav className="header-nav ms-lg-auto align-items-lg-center gap-lg-3">
            <ToggleTheme />
            <Nav.Link href="/home#profile">Perfil</Nav.Link>
            <Nav.Link href="/home#experiencias">Experiencias</Nav.Link>
            <Nav.Link href="/home#skills">Skills</Nav.Link>
            <Button className="header-btn" onClick={isLoggedIn ? handleLogout : handleLogin}>
              {isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
