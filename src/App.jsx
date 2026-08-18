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
import Antigravity from "./components/background/Antigravity";
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
      <Antigravity
        count={300}
        magnetRadius={10}
        ringRadius={10}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={2}
        lerpSpeed={0.1}
        color="#FF9FFC"
        autoAnimate={false}
        particleVariance={1}
        rotationSpeed={0}
        depthFactor={1}
        pulseSpeed={3}
        particleShape="capsule"
        fieldStrength={10}
      />
      <div className="app-content">
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
      </div>
      <ToastContainer position="top-right" autoClose={3000} newestOnTop />
    </BrowserRouter>
  );
}

export default App;
