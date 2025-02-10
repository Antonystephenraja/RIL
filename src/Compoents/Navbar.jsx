import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiLogoutCircleRFill } from "react-icons/ri";
import "../Css/button_animation.css";
import Xyma_white_bg from "../Assets/xyma.png";
import Ril_Img from "../Assets/RIL.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [sidebar_action, setAction] = useState(parseInt(localStorage.getItem("Sidebar_status")) || 1);

  useEffect(() => {
    if (location.pathname === "/") {
      setAction(1);
    } else if (location.pathname === "/Analysis") {
      setAction(2);
    } else if (location.pathname === "/Report") {
      setAction(3);
    } else if (location.pathname === "/Settings") {
      setAction(4);
    }
  }, [location.pathname]); 
  const submitbutton = (id) => {
    localStorage.setItem("Sidebar_status", id);
    setAction(id);
    if (id === 1) navigate("/");
    else if (id === 2) navigate("/Analysis");
    else if (id === 3) navigate("/Report");
    else if (id === 4) navigate("/Settings");
  };

  const handleLogout_Button = () => {
    localStorage.clear();
    navigate("login");
  };

  const getButtonClass = (id) => {
    return `border border-gray-500 w-[15%] md:w-1/5 text-[10px] p-1 md:text-[15px] 2xl:text-[20px] rounded-md flex items-center justify-center hover:cursor-pointer ${
      sidebar_action === id ? "bg-orange-400 text-white" : "hover:border hover:border-gray-300"
    }`;
  };

  return (
    <div className="text-white h-full w-full flex justify-between items-center p-0 md:p-4 gap-2 md:gap-2">
      <div className="w-[60%] md:w-[7%]">
        <img src={Xyma_white_bg} alt="Xyma" />
      </div>

      <div className={getButtonClass(1)} onClick={() => submitbutton(1)}>
        Home
      </div>
      <div className={getButtonClass(2)} onClick={() => submitbutton(2)}>
        Data Trend
      </div>
      <div className={getButtonClass(3)} onClick={() => submitbutton(3)}>
        Report
      </div>
      <div className={getButtonClass(4)} onClick={() => submitbutton(4)}>
        Settings
      </div>

      <div className="w-[60%] md:w-[10%] mb-2">
        <img src={Ril_Img} alt="RIL" />
      </div>

      <div>
        <RiLogoutCircleRFill
          className="text-2xl text-red-500 hover:cursor-pointer transform transition-transform duration-300 hover:scale-110"
          onClick={handleLogout_Button}
        />
      </div>
    </div>
  );
};

export default Navbar;
