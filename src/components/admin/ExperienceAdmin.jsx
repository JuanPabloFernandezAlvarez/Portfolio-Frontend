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
  const [isEditing, setIsEditing] = useState(false);

  const selectedExperience = useMemo(
    () => experiences.find((experience) => String(experience.id) === String(selectedId)),
    [experiences, selectedId]
  );

  const loadExperiences = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await authFetch("/Experience");
      if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar las experiencias"));
      }

      const data = await response.json();
      console.log("Respuesta completa de la API:", data);
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

    const isUpdateMode = isEditing && Boolean(selectedExperience);

    try {
      const response = await authFetch(isUpdateMode ? `/Experience/${selectedExperience.id}` : "/Experience", {
        method: isUpdateMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, isUpdateMode ? "No se pudo actualizar la experiencia" : "No se pudo crear la experiencia")
        );
      }

      toast.success(isUpdateMode ? "Experiencia actualizada" : "Experiencia creada");
      resetForm();
      await loadExperiences();
    } catch (error) {
      toast.error(error.message || "Error de conexión al guardar la experiencia");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (experience) => {
    setSelectedId(experience.id);
    setIsEditing(true);
    setForm({
      title: experience.title ?? "",
      description: experience.description ?? "",
      summary: experience.summary ?? "",
      imagePath: experience.imagePath ?? "",
    });
  };

  const resetForm = () => {
    setSelectedId(null);
    setIsEditing(false);
    setForm({ ...emptyForm });
  };

  const getExperienceKey = (experience, index) => {
    const candidateId = experience?.id;
    if (candidateId === null || candidateId === undefined || candidateId === "") {
      return `experience-${index}`;
    }

    return String(candidateId);
  };

  const handleDelete = async (id) => {
    try {
      console.log("ID a eliminar:", id);
      const response = await authFetch(`/Experience/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo eliminar la experiencia"));
      }

      toast.success("Experiencia eliminada");
      if (String(selectedId) === String(id)) {
        resetForm();
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
            <Button type="button" size="sm" variant="outline-secondary" onClick={resetForm}>
              Nueva experiencia
            </Button>
          </div>

          <div className="admin-list">
            {isLoading ? (
              <p>Cargando experiencias...</p>
            ) : (
              experiences.map((experience, index) => (
                <ExperienceCard
                  experience={experience}
                  key={getExperienceKey(experience, index)}
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
            <h3>{isEditing && selectedExperience ? "Actualizar experiencia" : "Nueva experiencia"}</h3>
          </div>

          <Form.Control required name="title" placeholder="Titulo" value={form.title} onChange={handleChange} />
          <Form.Control as="textarea" rows={2} required name="description" placeholder="Descripcion" value={form.description} onChange={handleChange} />
          <Form.Control as="textarea" rows={4} required name="summary" placeholder="Resumen" value={form.summary} onChange={handleChange} />
          <Form.Control required name="imagePath" placeholder="Ruta o URL de la imagen" value={form.imagePath} onChange={handleChange} />

          <div className="form-actions">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Guardando..." : isEditing && selectedExperience ? "Guardar cambios" : "Crear"}
            </Button>
            <Button type="button" variant="outline-secondary" disabled={isSaving} onClick={resetForm}>
              {isEditing && selectedExperience ? "Cancelar edición" : "Limpiar"}
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default ExperienceAdmin;
