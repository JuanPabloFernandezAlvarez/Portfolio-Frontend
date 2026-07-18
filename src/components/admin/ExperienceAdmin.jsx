import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PencilSquare, PlusCircle, Search, Trash } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import ExperienceCard from "../experiences/ExperienceCard";
import { authFetch } from "../../services/authFetch";

const emptyForm = {
  title: "",
  description: "",
  summary: "",
  imagePath: "",
};

const getErrorMessage = async (response, fallback) => {
  const text = await response.text().catch(() => "");
  if (!text) return fallback;

  try {
    const data = JSON.parse(text);
    return data.message || data.title || data.error || fallback;
  } catch {
    return text;
  }
};

const ExperienceAdmin = () => {
  const [query, setQuery] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const selectedExperience = useMemo(
    () => experiences.find((experience) => String(experience.id) === String(selectedId)),
    [experiences, selectedId]
  );

  const loadExperiences = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await authFetch("/Experiences");
      if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar las experiencias"));
      }

      const data = await response.json();
      const allExperiences = Array.isArray(data) ? data : data.items || data.$values || [];
      const normalizedQuery = query.trim().toLowerCase();
      setExperiences(
        allExperiences.filter((experience) =>
          !normalizedQuery ||
          [experience.title, experience.description, experience.summary]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        )
      );
    } catch (error) {
      toast.error(error.message || "Error de conexión al cargar las experiencias");
      setExperiences([]);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadExperiences();
  }, [loadExperiences]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const response = await authFetch(
        selectedExperience ? `/Experiences/${selectedExperience.id}` : "/Experiences",
        {
          method: selectedExperience ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response,
            selectedExperience ? "No se pudo actualizar la experiencia" : "No se pudo crear la experiencia"
          )
        );
      }

      toast.success(selectedExperience ? "Experiencia actualizada" : "Experiencia creada");
      setSelectedId(null);
      setForm(emptyForm);
      await loadExperiences();
    } catch (error) {
      toast.error(error.message || "Error de conexión al guardar la experiencia");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (experience) => {
    setSelectedId(experience.id);
    setForm({
      title: experience.title ?? "",
      description: experience.description ?? "",
      summary: experience.summary ?? "",
      imagePath: experience.imagePath ?? "",
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await authFetch(`/Experiences/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo eliminar la experiencia"));
      }

      toast.success("Experiencia eliminada");
      if (String(selectedId) === String(id)) {
        setSelectedId(null);
        setForm(emptyForm);
      }
      await loadExperiences();
    } catch (error) {
      toast.error(error.message || "Error de conexión al eliminar la experiencia");
    }
  };

  return (
    <section id="admin" className="admin-section">
      <div className="app-container admin-layout">
        <div>
          <div className="section-heading">
            <p>Superadmin</p>
            <h2>Gestion de experiencias</h2>
          </div>

          <div className="search-row">
            <Search />
            <Form.Control
              placeholder="Buscar para actualizar o eliminar"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="admin-list">
            {isLoading ? (
              <p>Cargando experiencias...</p>
            ) : (
              experiences.map((experience) => (
                <ExperienceCard
                  experience={experience}
                  key={experience.id}
                  actions={
                    <div className="admin-actions">
                      <Button aria-label="Editar experiencia" size="sm" variant="outline-primary" onClick={() => handleEdit(experience)}>
                        <PencilSquare />
                      </Button>
                      <Button aria-label="Eliminar experiencia" size="sm" variant="outline-danger" onClick={() => handleDelete(experience.id)}>
                        <Trash />
                      </Button>
                    </div>
                  }
                />
              ))
            )}
          </div>
        </div>

        <Form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form__header">
            <PlusCircle />
            <h3>{selectedExperience ? "Actualizar experiencia" : "Nueva experiencia"}</h3>
          </div>

          <Form.Control required name="title" placeholder="Titulo" value={form.title} onChange={handleChange} />
          <Form.Control as="textarea" rows={2} required name="description" placeholder="Descripcion" value={form.description} onChange={handleChange} />
          <Form.Control as="textarea" rows={4} required name="summary" placeholder="Resumen" value={form.summary} onChange={handleChange} />
          <Form.Control required name="imagePath" placeholder="Ruta o URL de la imagen" value={form.imagePath} onChange={handleChange} />

          <div className="form-actions">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Guardando..." : selectedExperience ? "Guardar cambios" : "Crear"}
            </Button>
            <Button type="button" variant="outline-secondary" disabled={isSaving} onClick={() => { setSelectedId(null); setForm(emptyForm); }}>
              Limpiar
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default ExperienceAdmin;
