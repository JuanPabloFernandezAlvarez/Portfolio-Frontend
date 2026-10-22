const DEVICON_SVG_BASE_URL =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const Skill = ({ name, image }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-2">
      <img
        src={`${DEVICON_SVG_BASE_URL}/${image}.svg`}
        alt=""
        aria-hidden="true"
        style={{ width: "32px", height: "32px", objectFit: "contain" }}
      />
      <span className="text-sm fs-6">{name}</span>
    </div>
  );
}

export default Skill