import React from 'react';
import '../Css/button_animation.css'
import Xyma_white_bg from '../Assets/xyma.png'
const Navbar = () => {
  return (
    <div className="text-white h-full w-full flex justify-between items-center p-4 ">
      {/* Column 1 */}
      <div className='w-[10%]'>
        <img src={Xyma_white_bg}/>
      </div>
      <div className="border w-1/5 rounded-md flex items-center justify-center hover:cursor-pointer bg-[#180059] relative overflow-hidden">
      Home
      </div>
      {/* Column 2 */}
      <div className="border w-1/5 rounded-md flex items-center justify-center hover:cursor-pointer">
        Analysis
      </div>
      {/* Column 3 */}
      <div className="border w-1/5 rounded-md flex items-center justify-center hover:cursor-pointer">
        Report
      </div>
      {/* Column 4 */}
      <div className="border w-1/5 rounded-md flex items-center justify-center hover:cursor-pointer">
        Settings
      </div>
      <div className=''>
        <img src=''/>
      </div>
    </div>
  );
};

export default Navbar;
