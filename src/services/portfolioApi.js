import { experienceSeed, portfolioUser } from "../data/portfolio.seed";

const STORAGE_KEY = "Portfolio-2026-Experiences";

const normalizeExperience = ({ id, title = "", description = "", summary = "", imagePath = "" }) => ({
  ...(id !== undefined && { id }),
  title,
  description,
  summary,
  imagePath,
});

const wait = (value) => new Promise((resolve) => window.setTimeout(() => resolve(value), 180));

const readStoredExperiences = () => {
  const rawExperiences = localStorage.getItem(STORAGE_KEY);

  if (!rawExperiences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(experienceSeed));
    return experienceSeed;
  }

  const experiences = JSON.parse(rawExperiences).map(normalizeExperience);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(experiences));
  return experiences;
};

const writeStoredExperiences = (experiences) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(experiences));
  return experiences;
};

export const portfolioApi = {
  async getPublicProfile() {
    return wait(portfolioUser);
  },

  async searchExperiences({ query = "" } = {}) {
    const normalizedQuery = query.trim().toLowerCase();
    const experiences = readStoredExperiences().filter((experience) => {
      if (!normalizedQuery) return true;

      return [experience.title, experience.description, experience.summary]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });

    return wait(experiences);
  },

  async createExperience(payload) {
    const experiences = readStoredExperiences();
    const nextExperience = {
      ...normalizeExperience(payload),
      id: crypto.randomUUID(),
    };

    writeStoredExperiences([nextExperience, ...experiences]);
    return wait(nextExperience);
  },

  async updateExperience(id, payload) {
    const experiences = readStoredExperiences();
    const updatedExperiences = experiences.map((experience) =>
      String(experience.id) === String(id)
        ? { ...normalizeExperience(payload), id: experience.id }
        : experience
    );

    writeStoredExperiences(updatedExperiences);
    return wait(updatedExperiences.find((experience) => String(experience.id) === String(id)));
  },

  async deleteExperience(id) {
    const experiences = readStoredExperiences();
    writeStoredExperiences(experiences.filter((experience) => String(experience.id) !== String(id)));
    return wait({ ok: true });
  },
};
