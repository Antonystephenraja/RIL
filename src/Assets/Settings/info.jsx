import React from "react";
import utmaps from '../uTMAPS_1.55__1_-removebg-preview.png';
import utmaps_img from '../utmaps.png'
const Infos = () => {
  return (
    // <div className="border md:w-[40%] md:h-[90%] rounded-md text-white md:flex">
      <div className="w-[100%] md:w-[100%] h-[50%] md:h-[100%]">
        <div className="h-[65%] md:h-[73%] flex items-center justify-center">
          <img src={utmaps_img} className="mt-6" width="20%" />
        </div>
        <div className="h-[50%] text-[20px] md:text-[17px] 2xl:text-[20px] xl:text-[13px] text-center">
          XYMA Manufactures unique ultrasonic waveguide-based sensors to address
          the critical need of industries in High-Temperature applications. Our
          Sensors are Enhanced with industrial IoT and Physics-based soft
          sensing to enhance industrial automation.
          <br />
          <span className="text-[12px] xl:text-[10px] 2xl:text-[12px] md:text-[10px]">
            © 2025 XYMA Analytics Pvt Ltd,IIT Madras Research
            Park,Chennai,600113
          </span>
          <br />
          <span className=" text-[12px] xl:text-[8px] 2xl:text-[12px] md:text-[10px]">
            Security: TLS 1.2 protocol
          </span>
        </div>
      </div>
    // </div>
  );
};

export default Infos;