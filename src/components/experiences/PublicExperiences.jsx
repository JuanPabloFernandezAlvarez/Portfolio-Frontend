import { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { authFetch } from "../../services/authFetch";
import AccordionGallery from "./AccordionGallery";

const PublicExperiences = () => {
  const [query, setQuery] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      setIsLoading(true);

      try {
        const response = await authFetch("/Experience");
        if (!response.ok) throw new Error("No se pudieron cargar las experiencias");

        const data = await response.json();
        const allExperiences = Array.isArray(data) ? data : data.items || data.$values || [];
        const normalizedQuery = query.trim().toLowerCase();

        setExperiences(
          allExperiences.filter(
            (experience) =>
              !normalizedQuery ||
              [experience.title, experience.description, experience.summary]
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery)
          )
        );
      } catch (error) {
        console.error(error);
        setExperiences([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadExperiences();
  }, [query]);

  return (
    <section id="experiencias" className="section-band">
      <div className="app-container">
        <div className="section-heading">
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
        ) : experiences.length ? (
          <AccordionGallery items={experiences} />
        ) : (
          <p>No hay experiencias para mostrar.</p>
        )}
      </div>
    </section>
  );
};

export default PublicExperiences;
