import React, { useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import { IoInformationCircleOutline, IoMailUnread, IoMailOpen } from "react-icons/io5";
import { MdOutlineSpeed } from "react-icons/md";
import Limits from '../Assets/Settings/limit.jsx';
import Infos from '../Assets/Settings/info.jsx';

const Settings = () => {
  const [selectedContent, setSelectedContent] = useState('info');

  const access = localStorage.getItem("UserRole") || "user"
  console.log(access)
  const contentTypes = [
    { id: 'info', label: 'Info', icon: <IoIosInformationCircle /> },
    { id: 'limit', label: 'Limit', icon: <MdOutlineSpeed /> },
    // { id: 'email', label: 'Email', icon: <IoMailUnread /> },
    // { id: 'email-queue', label: 'Email Queue', icon: <IoMailOpen /> },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div className="w-full h-full md:h-[90%] flex justify-center items-center">
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-white md:flex-row md:gap-40">
          {/* Button Container */}
          {access == "user"?(<div className="flex justify-center items-center">
            <div className="w-full md:w-[70%] md:h-full border-2 border-white rounded-md p-4 flex items-center justify-center">
            {selectedContent === 'info' && <Infos />}
            {selectedContent === 'limit' && <Limits />}
            {selectedContent === 'email' && <p>Email Settings Coming Soon...</p>}
            {selectedContent === 'email-queue' && <p>Email Queue Management Coming Soon...</p>}
            {!selectedContent && <p className="text-lg md:text-xl">Select a setting category</p>}
          </div>
          </div>):(<div className="flex flex-col items-center justify-center w-full h-full gap-4 text-white md:flex-row md:gap-40">
            <div className="w-full md:w-[10%] h-auto md:h-full flex flex-row md:flex-col justify-around md:justify-evenly items-center md:border-2 md:rounded-md p-2">
            {contentTypes.map((content, index) => (
              <div key={index} className="flex flex-col items-center gap-2 md:gap-5">
                <button
                  type="button"
                  className="flex items-center justify-center w-12 h-12 p-2 text-black bg-orange-400 rounded-full hover:bg-yellow-500 focus:outline-none md:w-14 md:h-14"
                  onClick={() => setSelectedContent(content.id)}
                >
                  <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-[35px]">{content.icon}</div>
                </button>
                <p className="text-sm font-extrabold text-center md:text-[15px] 2xl:text-[20px]">
                  {content.label}
                </p>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="w-full md:w-[70%] h-full border-2 border-white rounded-md p-4 flex items-center justify-center">
            {selectedContent === 'info' && <Infos />}
            {selectedContent === 'limit' && <Limits />}
            {selectedContent === 'email' && <p>Email Settings Coming Soon...</p>}
            {selectedContent === 'email-queue' && <p>Email Queue Management Coming Soon...</p>}
            {!selectedContent && <p className="text-lg md:text-xl">Select a setting category</p>}
          </div>
          </div>)}
          
        </div>
      </div>
    </div>
  );
};

export default Settings;