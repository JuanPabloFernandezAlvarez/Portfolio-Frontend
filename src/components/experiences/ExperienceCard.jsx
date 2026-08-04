import { useEffect, useState } from "react";

const resolveImageSource = (imagePath) => {
  const source = imagePath?.trim();

  if (!source) return "";
  if (source.startsWith("//")) return `https:${source}`;
  if (/^(https?:|data:|blob:)/i.test(source) || source.startsWith("/")) return source;

  // Permite pegar dominios como "www.ejemplo.com/imagen.jpg" sin que el
  // navegador los interprete como una ruta interna de la aplicación.
  return `https://${source}`;
};

const ExperienceCard = ({ experience, actions }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const imageSource = resolveImageSource(experience.imagePath);

  useEffect(() => {
    setHasImageError(false);
  }, [imageSource]);

  return (
    <article className="experience-card">
      {imageSource && !hasImageError && (
        <img
          className="experience-card__image"
          src={imageSource}
          alt={`Imagen de ${experience.title}`}
          onError={() => setHasImageError(true)}
        />
      )}
      <div className="experience-card__header">
        <h3>{experience.title}</h3>
        <p className="experience-card__description">{experience.description}</p>
      </div>
      <p className="experience-card__summary">{experience.summary}</p>
      {actions && <div className="experience-card__footer">{actions}</div>}
    </article>
  );
};

export default ExperienceCard;
