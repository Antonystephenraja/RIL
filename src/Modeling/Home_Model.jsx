import React from "react";
import Images from "../Assets/rilsensor.png";
import { TbTemperaturePlus } from "react-icons/tb";
import { useAlldata } from "../AppRouteing/DataWrapping";
import { TbDeviceDesktopCheck } from "react-icons/tb";
import { TbDeviceDesktopCancel } from "react-icons/tb";
const Home_Model = () => {
  const { Sensordata } = useAlldata();
  const Active_Last_Value =
    Sensordata && Sensordata.value ? Sensordata.value : ["N/A"];
  const Sensor_status = Sensordata.activityStatus;

  return (
    <div className="relative mt-[20%] h-[100%]">
      {/* Background Image */}
      <img
        src={Images}
        alt="Background"
        className="w-full h-[65%] md:h-[85%]"
      />
      {/* Popup 1 */}
      <div
        className="absolute top-[-5%] left-[-60%] w-[120%] md:top-[1%] md:left-[-20%] transform -translate-x-2/4 bg-black bg-opacity-70 flex justify-center items-center rounded  text-white text-xs 
        md:text-sm md:w-[70%] md:h-[20%] lg:text-base border border-orange-400 border-b-2 transition-transform duration-300 hover:scale-[110%] hover:cursor-pointer  hover:left-[-21%]"
      >
        <div className="grid grid-rows-2">
          <div className="text-[10px] md:text-[18px]  flex items-center justify-center 2xl:text-[15px]">
            S1
          </div>
          <div>
            <div className="flex items-center justify-center ">
              <span>
                <TbTemperaturePlus className="text-[10px] md:text-[18px] 2xl:text-[15px]" />
              </span>
              <span className="text-[10px] md:text-[12px] 2xl:text-[12px]">
                {Active_Last_Value.Sensor1} ℃
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute top-[17%] w-[120%] left-[157%] md:top-[27%] md:left-[117%] transform -translate-x-2/4 bg-black bg-opacity-70 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[70%] md:h-[20%] lg:text-base border border-orange-400 border-b-2  transition-transform duration-300 hover:scale-[110%] hover:cursor-pointer  hover:left-[118%]"
      >
        <div className="grid grid-rows-2">
          <div className="text-[10px] md:text-[18px] flex items-center justify-center 2xl:text-[15px]">
            S2
          </div>
          <div>
            <div className="flex items-center justify-center gap-1">
              <span>
                <TbTemperaturePlus className="text-[10px] md:text-[15px] 2xl:text-[15px]" />
              </span>
              <span className="text-[10px] md:text-[12px] 2xl:text-[12px]">
                {Active_Last_Value.Sensor2} ℃
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[-10%] left-[115%]">
        {Sensor_status === "active" ? (
          <span className="border  p-1 rounded-md border-gray-400 bg-green-400 text-black text-[10px] 2xl:text-[15px] m-1 flex gap-1 items-center">
            <TbDeviceDesktopCheck />
            Online
          </span>
        ) : (
          <span className="border p-1 rounded-md border-gray-400 h-[10%]  bg-red-400 text-black text-[10px] 2xl:text-[15px] m-1 flex gap-1 items-center">
            <TbDeviceDesktopCancel />
            Offline
          </span>
        )}
      </div>
      <div
        className="absolute top-[40%] w-[120%] md:top-[58%] left-[-60%]  md:left-[-20%] transform -translate-x-2/4 bg-black bg-opacity-70 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[70%] md:h-[20%] lg:text-base border border-orange-400 border-b-2  transition-transform duration-300 hover:scale-[110%] hover:cursor-pointer  hover:left-[-21%] "
      >
        <div className="grid grid-rows-2">
          <div className="text-[10px] md:text-[15px] flex items-center justify-center 2xl:text-[15px]">
            S3
          </div>
          <div>
            <div className="flex items-center justify-center ">
              <span>
                <TbTemperaturePlus className="text-[10px] md:text-[15px] 2xl:text-[15px]" />
              </span>
              <span className="text-[10px] md:text-[12px] 2xl:text-[12px]">
                {Active_Last_Value.Sensor3} ℃
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-[7%] left-[21%] md:top-[10%] md:left-[30%] transform -translate-x-2/4 bg-orange-400 border border-black bg-opacity-100 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[33%] md:h-[1%] w-[52%] h-[2%]"
      ></div>
      <div
        className="absolute top-[27%] left-[75%] md:top-[37%] md:left-[67%] transform -translate-x-2/4 bg-orange-400 border border-black bg-opacity-100 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[33%] md:h-[1%] w-[52%] h-[2%]"
      ></div>
      <div
        className="absolute top-[50%] left-[22%] md:top-[66%] md:left-[30%] transform -translate-x-2/4 bg-orange-400 border border-black bg-opacity-100 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[33%] md:h-[1%] w-[52%] h-[2%]"
      ></div>
    </div>
  );
};

export default Home_Model;
