import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Button = ({ text, label, id, route, onclick }) => {
  const [btnState, setBtnState] = useState(false);
  const handleClick = () => {
    setBtnState((btnState) => !btnState);
  };
  let toggleClassCheck = btnState ? "active-btn" : "";
  return (
    <div
      label={label}
      onClick={onclick}
      className={`w-[120px] h-[40px] bg-blue-400 rounded-md flex items-center justify-center text-[white] cursor-pointer ${toggleClassCheck}`}
    >
      <h3>{text}</h3>
    </div>
  );
};

export default Button;
