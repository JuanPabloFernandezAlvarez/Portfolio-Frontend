import Skill from "../skill/Skill";
import "../../assets/App.css";

const skillsByCategory = {
  Frontend: [
    { name: "HTML", image: "html5/html5-original" },
    { name: "CSS", image: "css3/css3-original" },
    { name: "JavaScript", image: "javascript/javascript-original" },
    { name: "ReactJs", image: "react/react-original" },
    { name: "Figma", image: "figma/figma-original" },
  ],
  Backend: [
    { name: "MySQL", image: "mysql/mysql-original" },
    { name: "Python", image: "python/python-original" },
    { name: "Flask", image: "flask/flask-original" },
    { name: "NodeJs", image: "nodejs/nodejs-original" },
    { name: "Express.JS", image: "express/express-original" },
    { name: "MongoDB", image: "mongodb/mongodb-original" },
    { name: "C", image: "c/c-original" },
  ],
  Aprendiendo: [
    { name: "Tailwindcss", image: "tailwindcss/tailwindcss-original" },
    { name: "Docker", image: "docker/docker-original" },
  ],
  Herramientas: [
    { name: "Git", image: "git/git-original" },
    { name: "GitHub", image: "github/github-original" },
    { name: "Terminal", image: "bash/bash-original" },
    { name: "VsCode", image: "vscode/vscode-original" },
    { name: "Npm", image: "npm/npm-original" },
    { name: "PostMan", image: "postman/postman-original" },
    { name: "Bootstrap", image: "bootstrap/bootstrap-original" },
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
                    <Skill name={skill.name} image={skill.image} />
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
