import { Button } from "react-bootstrap";
const Skill = ({ name, image }) => {

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-2">
      <img src={image} alt={name} style={{width:"32px", height:"32px", objectFit:"contain"}}/>
      <span className="text-sm fs-6">{name}</span>
    </div>
  );
}

export default Skill