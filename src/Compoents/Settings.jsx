import React, { useState } from "react";
import { RiAdminLine } from "react-icons/ri";
import img1 from "../Assets/img1.jpeg";
import img2 from "../Assets/img2.jpeg";
import utmaps from "../Assets/uTMAPS_1.55__1_-removebg-preview.png";

import Limits from '../Assets/Settings/limit.jsx'; 
import Infos from '../Assets/Settings/info.jsx'; 
const images = [img1, img2];

const Settings = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedContent, setSelectedContent] = useState('info');

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const hanldleadminbutton = () => {
    console.log("yesss");
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      {/* <div className="flex items-end justify-end mt-1">
        <RiAdminLine className="text-white text-[30px] border rounded-md cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:bg-orange-400" onClick={()=>hanldleadminbutton()}/>
      </div> */}
      <div className="w-full h-full md:h-[80%] flex justify-center items-center">
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-white md:flex-row md:gap-40">
          {/* Button Container */}
          <div className="w-full md:w-[10%] h-auto md:h-full flex flex-row md:flex-col justify-around md:justify-evenly items-center md:border-2 md:border-bwhite md:rounded-md p-2">
            {['info', 'limit', null, null].map((contentType, index) => (
              <div key={index} className="flex flex-col items-center gap-2 md:gap-5">
                <button
                  type="button"
                  className="flex items-center justify-center w-12 h-12 p-2 text-black bg-orange-400 rounded-full hover:bg-yellow-500 focus:outline-none md:w-14 md:h-14"
                  onClick={() => setSelectedContent(contentType)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 md:w-12 md:h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </button>
                <p className="text-sm font-extrabold text-center md:text-2xl">
                  {index === 0 ? 'info' : index === 1 ? 'limit' : index === 2 ? 'email' : 'email-queue'}
                </p>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="w-full md:w-[70%] h-full border-2 border-white rounded-md p-4 flex items-center justify-center">
            {selectedContent === 'info' && <Infos />}
            {selectedContent === 'limit' && <Limits />}
            {!selectedContent && <p className="text-lg md:text-xl">Select a setting category</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

