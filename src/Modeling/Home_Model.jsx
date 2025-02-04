import React from 'react';
import Images from '../Assets/ut.png';
import { TbTemperaturePlus } from "react-icons/tb";
import { useAlldata } from '../AppRouteing/DataWrapping';

const Home_Model = () => {
    const {Sensordata,terminalOutput,setTerminalOutput }=useAlldata();
    const Active_Last_Value = Sensordata && Sensordata.value ? Sensordata.value :['N/A']

  return (
    <div className="relative mt-[20%]">
      {/* Background Image */}
      <img src={Images} alt="Background" className="w-full h-auto" />
      
      {/* Popup 1 */}
      <div
        className="absolute top-[5%] left-[40%] transform -translate-x-2/4 bg-black bg-opacity-70 flex justify-center items-center rounded  text-white text-xs 
        md:text-sm md:w-[15%] md:h-[27%] lg:text-base border border-orange-400 border-b-2 transition-transform duration-300 hover:scale-[110%] hover:cursor-pointer  hover:left-[39%]"
      >
          <div className='grid grid-rows-2'>
            <div className='text-[10px] flex items-center justify-center 2xl:text-[15px]'>S1</div>
            <div>
              <div className='flex items-center justify-center '>
                <span><TbTemperaturePlus className='text-[8px] 2xl:text-[15px]'/></span>
                <span className='text-[8px] 2xl:text-[12px]'>{Active_Last_Value.Sensor1} ℃</span>
              </div>

            </div>
         </div>
      </div>
      <div
        className="absolute top-[5%] left-[57%] transform -translate-x-2/4 bg-black bg-opacity-70 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[15%] md:h-[27%] lg:text-base border border-orange-400 border-b-2  transition-transform duration-300 hover:scale-[110%] hover:cursor-pointer  hover:top-[3%]"
      >
        <div className='grid grid-rows-2'>
            <div className='text-[10px] flex items-center justify-center 2xl:text-[15px]'>S2</div>
            <div>
              <div className='flex items-center justify-center gap-1'>
                <span><TbTemperaturePlus className='text-[8px] 2xl:text-[15px]'/></span>
                <span className='text-[8px] 2xl:text-[12px]'>{Active_Last_Value.Sensor2} ℃</span>
              </div>

            </div>
         </div>
      </div>
      <div
        className="absolute top-[5%] left-[75%] transform -translate-x-2/4 bg-black bg-opacity-70 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[15%] md:h-[27%] lg:text-base border border-orange-400 border-b-2  transition-transform duration-300 hover:scale-[110%] hover:cursor-pointer  hover:top-[3%] "
      >
        <div className='grid grid-rows-2'>
            <div className='text-[10px] flex items-center justify-center 2xl:text-[15px]'>S3</div>
            <div>
              <div className='flex items-center justify-center '>
                <span><TbTemperaturePlus className='text-[8px] 2xl:text-[15px]'/></span>
                <span className='text-[8px] 2xl:text-[12px]'>{Active_Last_Value.Sensor3} ℃</span>
              </div>

            </div>
         </div>
      </div>
      <div
        className="absolute top-[5%] left-[92%] transform -translate-x-2/4 bg-black bg-opacity-70 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[15%] md:h-[27%] lg:text-base border border-orange-400 border-b-2  transition-transform duration-300 hover:scale-[110%] hover:cursor-pointer hover:top-[3%] hover:border-b-[]"
      >
        <div className='grid grid-rows-2'>
            <div className='text-[10px] flex items-center justify-center 2xl:text-[15px]'>S4</div>
            <div>
              <div className='flex items-center justify-center '>
                <span><TbTemperaturePlus className='text-[8px] 2xl:text-[15px]'/></span>
                <span className='text-[8px] 2xl:text-[12px]'>{Active_Last_Value.Sensor4} ℃</span>
              </div>

            </div>
         </div>
      </div>
      <div
        className="absolute top-[1%] left-[10%] md:top-[6%] md:left-[47.5%] transform -translate-x-2/4 bg-white bg-opacity-70 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[0.5%] md:h-[40%] "
      >
      </div>
      <div
        className="absolute top-[10%] left-[10%] md:top-[31%] md:left-[63%] transform -translate-x-2/4 bg-white bg-opacity-70 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[0.5%] md:h-[15%]"
      >
      </div>
      <div
        className="absolute top-[10%] left-[20%] md:top-[31%] md:left-[76%] transform -translate-x-2/4 bg-white bg-opacity-70 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[0.5%] md:h-[15%]"
      >
      </div>
      <div
        className="absolute top-[10%] left-[50%] md:top-[31%] md:left-[87%] transform -translate-x-2/4 bg-white bg-opacity-70 rounded flex justify-center items-center text-white text-xs 
        md:text-sm md:w-[0.5%] md:h-[15%]"
      >
      </div>
      
    </div>
  );
};

export default Home_Model;
