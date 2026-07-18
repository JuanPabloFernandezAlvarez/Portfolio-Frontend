const ExperienceCard = ({ experience, actions }) => {
  return (
    <article className="experience-card">
      {experience.imagePath && (
        <img className="experience-card__image" src={experience.imagePath} alt={experience.title} />
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
