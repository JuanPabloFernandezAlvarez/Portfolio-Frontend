import { useRef, useState, useContext } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import "./Login.css";
import { AuthContext } from "../../../services/authContext/Auth.Context";
import { validatePassword, validateUsername } from "./auth.services";
import { API_BASE_URL } from "../../../services/authFetch";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
    const { handleUserLogin } = useContext(AuthContext);


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setErrors((prev) => ({ ...prev, username: false }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prev) => ({ ...prev, password: false }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones
    const usernameError = validateUsername(username);
    if (usernameError) {
      toast.error(usernameError);
      usernameRef.current?.focus();
      setErrors((prev) => ({ ...prev, username: true }));
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      passwordRef.current?.focus();
      setErrors((prev) => ({ ...prev, password: true }));
      return;
    }

    // Login
    try {
      const res = await fetch(`${API_BASE_URL}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const responseText = await res.text();
      let data;

      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch {
        data = responseText;
      }

      const token = data.token || (typeof data === "string" ? data : null);
      if (res.ok && token) {
        handleUserLogin(token);
        onLogin();
        toast.success("Inicio de sesión exitoso", { autoClose: 3000 });
        navigate("/admin");
      } else {
        toast.error(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error de conexión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-gradient"></div>
      <div className="login-content">
        <div className="login-card">

          <Form onSubmit={handleSubmit} className="login-form">
            <FormGroup className="form-group-custom">
              <Form.Label className="form-label">Nombre de Usuario</Form.Label>
              <div className="input-wrapper">
                <Form.Control
                  type="text"
                  className={`input-custom ${errors.username ? "has-error" : ""}`}
                  placeholder="JohnDoe"
                  onChange={handleUsernameChange}
                  value={username}
                  ref={usernameRef}
                  autoComplete="username"
                />
              </div>
              {errors.username && <p className="error-text">El nombre de usuario es obligatorio</p>}
            </FormGroup>

            <FormGroup className="form-group-custom">
              <Form.Label className="form-label">Contraseña</Form.Label>
              <div className="input-wrapper password-wrapper">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  className={`input-custom ${errors.password ? "has-error" : ""}`}
                  placeholder="••••••••"
                  onChange={handlePasswordChange}
                  value={password}
                  ref={passwordRef}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Ocultar" : "Mostrar"}
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="error-text">La contraseña no es válida</p>}
            </FormGroup>

            <Button type="submit" className="btn-login">
              Iniciar Sesión
            </Button>
          </Form>

          <div className="login-footer">
            <p>¿No tenés cuenta? Contacta al administrador</p>
          </div>
        </div>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

export default Login;
