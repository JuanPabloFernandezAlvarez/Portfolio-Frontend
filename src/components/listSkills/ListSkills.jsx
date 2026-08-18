import Skill from "../skill/Skill";
import "../../assets/App.css";

const skillsByCategory = {
  Frontend: [
    { name: "HTML", image: "/assets/skills/html.png" },
    { name: "CSS", image: "/assets/skills/css.png" },
    { name: "JavaScript", image: "/assets/skills/javascript.png" },
    { name: "ReactJs", image: "/assets/skills/react.png" },
    { name: "Figma", image: "/assets/skills/Figma.png" },
  ],
  Backend: [
    { name: "MySQL", image: "/assets/skills/sql.png" },
    { name: "Python", image: "/assets/skills/python.png" },
    { name: "Flask", image: "/assets/skills/flask.png" },
    { name: "NodeJs", image: "/assets/skills/nodeJs.png" },
    { name: "Express.JS", image: "/assets/skills/expressJs.png" },
    { name: "MongoDB", image: "/assets/skills/mongoDb.png" },
    { name: "C", image: "/assets/skills/c.png" },
  ],
  Aprendiendo: [
    { name: "Tailwindcss", image: "/assets/skills/tailwind.png" },
    { name: "Docker", image: "/assets/skills/docker.png" },
  ],
  Herramientas: [
    { name: "Git", image: "/assets/skills/git.png" },
    { name: "GitHub", image: "/assets/skills/github.png" },
    { name: "Terminal", image: "/assets/skills/terminal.png" },
    { name: "VsCode", image: "/assets/skills/vsCode.png" },
    { name: "Npm", image: "/assets/skills/npm.png" },
    { name: "PostMan", image: "/assets/skills/postman.png" },
    { name: "Bootstrap", image: "/assets/skills/bootstrap.png"},
  ],
};

const ListSkills = () => {
  return (
    <>
      <div
        id="skills"
        className="skills-section"
      >
        <div className="section-heading text-center">
          <h2>Skills</h2>
        </div>
        <div className="container-md categories-grid">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div className="skill-category" key={category}>
              <h3 className="text-center">{category}</h3>
              <div className="skill-list">
                {skills.map((skill) => (
                  <div className="profile__links" key={skill.name}>
                    <Skill  name={skill.name} image={skill.image} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ListSkills;
