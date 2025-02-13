import React, { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import img1 from "../Assets/img1.jpeg";
import img2 from "../Assets/img2.jpeg";
import utmaps from "../Assets/uTMAPS_1.55__1_-removebg-preview.png";

const images = [img1, img2];

const Settings = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="border md:w-[40%] md:h-[90%] rounded-md text-white md:flex">
        <div className="w-[100%] md:w-[100%] h-[50%] md:h-[100%]">
          <div className="h-[65%] md:h-[73%] flex items-center justify-center">
            <img src={utmaps} className="mt-6"/>
          </div>
          <div className="h-[30%] text-[10px] md:text-[17px] 2xl:text-[20px] xl:text-[13px] text-center">
          XYMA Manufactures unique ultrasonic waveguide-based sensors to address the critical need of industries in High-Temperature applications. Our Sensors are Enhanced with industrial IoT and Physics-based soft sensing to enhance industrial automation.<br/>
          <span className="xl:text-[10px] 2xl:text-[12px] md:text-[10px]">© 2025 XYMA Analytics Pvt Ltd,IIT Madras Research Park,Chennai,600113</span><br/>
          <span className="xl:text-[8px] 2xl:text-[12px] md:text-[10px]">Security: TLS 1.2 protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
