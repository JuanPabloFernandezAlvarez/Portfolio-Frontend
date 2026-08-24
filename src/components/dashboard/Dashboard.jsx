import { ArrowDownCircle, Envelope, Github, Linkedin } from "react-bootstrap-icons";
import { Button, Container } from "react-bootstrap";

const fallbackProfile = {
  fullName: "Juan Pablo Fernandez Alvarez",
  headline: "Desarrollador web Full Stack",
  email: "juanpablofernandezalvarez123@gmail.com",
  avatarUrl: "/assets/img/FotoPortfolio.png",
  cvUrl: "/assets/CV_Juan_Pablo_Fernandez_Alvarez(con foto).pdf",
  socialLinks: {},
};

const Dashboard = ({ profile = fallbackProfile }) => {
  const publicProfile = profile || fallbackProfile;

  const handleScroll = () => {
    const section = document.getElementById("experiencias");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="profile" className="hero-section">
      <div className="app-container hero-grid">
        <Container className="profile-panel">
          <img
            className="profile-avatar"
            src={publicProfile.avatarUrl}
            alt={publicProfile.fullName}
          />
          <Button
            href={publicProfile.cvUrl}
            download
            className="rounded-5"
            variant="outline-primary"
          >
            Descargar CV
          </Button>
          <div className="d-flex gap-3 fs-3 mt-3">
            <div className="profile__links">
              <a
                href={publicProfile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
            </div>

            <div className="profile__links">
              <a
                href={publicProfile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github />
              </a>
            </div>
            <div className="profile__links">
              <a href={`mailto:${publicProfile.email}`} aria-label="Email">
                <Envelope />
              </a>
            </div>
          </div>
        </Container>

        <div className="profile-copy">
          <p className="eyebrow">{publicProfile.headline}</p>
          <h1>{publicProfile.fullName}</h1>
          <p>{publicProfile.bio}</p>
        </div>
      </div>
      <div className="Arrow fs-3">
        <button onClick={handleScroll} className="scroll-button">
          <ArrowDownCircle />
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
