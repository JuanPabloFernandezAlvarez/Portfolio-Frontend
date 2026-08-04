import { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import ListSkills from "./components/listSkills/ListSkills.jsx";
import PublicExperiences from "./components/experiences/PublicExperiences.jsx";
import ExperienceAdmin from "./components/admin/ExperienceAdmin.jsx";
import { portfolioApi } from "./services/portfolioApi";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./components/auth/login/Login";
import NotFound from "./components/routes/notFound/NotFound";
import Protected from "./components/routes/protected/Protected";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const [profile, setProfile] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    portfolioApi.getPublicProfile().then(setProfile);
  }, []);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <main>
              <Dashboard profile={profile} />
              <PublicExperiences />
              <ListSkills />
            </main>
          }
        />
        <Route path="/login" element={<Login onLogin={handleSignIn} />} />
        <Route element={<Protected isSignedIn={isSignedIn} />}>
          <Route path="/admin" element={<ExperienceAdmin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} newestOnTop />
    </BrowserRouter>
  );
}

export default App;
