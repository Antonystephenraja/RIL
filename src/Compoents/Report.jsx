import React from 'react'
import { BsCalendar2Date } from "react-icons/bs";
import { PiClockCountdown } from "react-icons/pi";
import { TbAlarmAverage } from "react-icons/tb";
import { BsSkipForwardCircle } from "react-icons/bs";

const Report = () => {
  return (
    <div className='h-full space-y-2 m-2'>
      <div className='h-[27%] space-y-2 md:space-y-0 md:h-[13%] md:flex justify-around text-white'>
        <div className='border flex justify-center items-center w-full md:w-[10%] rounded-md'>
           <div className=''><BsCalendar2Date className='text-[300%] m-2'/></div>
            <div className='text-[17px] m-2'>Date Picker</div>
        </div>
        <div className='border flex justify-center items-center w-full md:w-[10%] rounded-md'>
        <div className=''><PiClockCountdown className='text-[300%] m-2'/></div>
        <div className='text-[17px] m-2'>Count</div>
        </div>
        <div className='border flex justify-center items-center w-full md:w-[10%] rounded-md'>
        <div className=''><TbAlarmAverage className='text-[300%] m-2'/></div>
        <div className='text-[17px] m-2'>Average</div>
        </div>
        <div className='border flex justify-center items-center w-full md:w-[10%] rounded-md'>
        <div className=''><BsSkipForwardCircle className='text-[300%] m-2'/></div>
            <div className='text-[17px] m-2'>Interval</div>
        </div>
      </div>
      <div className='h-[71%] md:h-[85%] border'>

      </div>
    </div>
  )
}

export default Report
