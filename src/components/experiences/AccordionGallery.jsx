import { useEffect, useState } from "react";
import { resolveImageSource } from "./experienceImage";
import "./AccordionGallery.css";

const getInitialIndex = (items) => (items.length > 2 ? 2 : 0);

const AccordionGallery = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(() => getInitialIndex(items));

  useEffect(() => {
    setActiveIndex((currentIndex) => Math.min(currentIndex, Math.max(items.length - 1, 0)));
  }, [items.length]);

  const handleKeyDown = (index, event) => {
    if (!items.length) return;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index + 1) % items.length);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index - 1 + items.length) % items.length);
    }
  };

  return (
    <div className="accordion-gallery" role="list" aria-label="Experiencias">
      {items.map((experience, index) => {
        const isActive = index === activeIndex;
        const imageSource = resolveImageSource(experience.imagePath);

        return (
          <article
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            key={experience.id}
            onClick={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={experience.title}
          >
            {imageSource ? (
              <img className="ag-panel__image" src={imageSource} alt={`Imagen de ${experience.title}`} />
            ) : (
              <div className="ag-panel__image ag-panel__image--placeholder" aria-hidden="true" />
            )}
            <div className="ag-panel__overlay" />
            <div className="ag-panel__content">
              <span className="ag-panel__bar" />
              <div>
                <h3>{experience.title}</h3>
                <p>{experience.description}</p>
                <p className="ag-panel__summary">{experience.summary}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
