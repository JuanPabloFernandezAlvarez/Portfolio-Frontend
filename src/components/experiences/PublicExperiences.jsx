import { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { portfolioApi } from "../../services/portfolioApi";
import ExperienceCard from "./ExperienceCard";

const PublicExperiences = () => {
  const [query, setQuery] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    portfolioApi
      .searchExperiences({ query, onlyPublic: true })
      .then(setExperiences)
      .finally(() => setIsLoading(false));
  }, [query]);

  return (
    <section id="experiencias" className="section-band">
      <div className="app-container">
        <div className="section-heading">
          <p>Perfil publico</p>
          <h2>Experiencias</h2>
        </div>

        <Form.Control
          className="portfolio-search"
          placeholder="Buscar por titulo, descripcion o resumen"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {isLoading ? (
          <div className="loading-state">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="experience-grid">
            {experiences.map((experience) => (
              <ExperienceCard experience={experience} key={experience.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicExperiences;
