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
    <Navbar fixed="top" bg="dark" data-bs-theme="dark" className="p-2 fs-6">
      <Container>
        <Navbar.Brand onClick={handleNavigateHome} style={{ cursor: "pointer" }}>
          Juan Pablo Fernandez
        </Navbar.Brand>
        <Nav className="align-items-center gap-3">
          <ToggleTheme />
          <Nav.Link href="#profile">Perfil</Nav.Link>
          <Nav.Link href="#experiencias">Experiencias</Nav.Link>
          <Nav.Link href="#skills">Skills</Nav.Link>
          <Button className="header-btn" onClick={isLoggedIn ? handleLogout : handleLogin}>
            {isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
