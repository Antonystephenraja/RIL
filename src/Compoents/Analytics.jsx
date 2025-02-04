import React,{useMemo, useState} from 'react'
import { BsCalendar2Date } from "react-icons/bs";
import { PiClockCountdown } from "react-icons/pi";
import { TbAlarmAverage } from "react-icons/tb";
import { BsSkipForwardCircle } from "react-icons/bs";
import { Line } from "react-chartjs-2";
import { BiScatterChart } from "react-icons/bi";

import {
  Chart as ChartJS,
  LineElement,
  Title,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import Dropdown from 'react-dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-dropdown/style.css';
import { useAlldata } from '../AppRouteing/DataWrapping';
import { IoArrowBackCircle } from "react-icons/io5";
// Register required Chart.js components
ChartJS.register(LineElement,Title, LinearScale, CategoryScale, PointElement, Tooltip, Legend,Filler);
const Analytics = () => {
  const[Active_status,setActive]=useState()
  const [startDate, setStartDate] = useState(new Date);
  const [endDate, setEndDate] = useState(new Date);
  const [SelectedsensorConfig, setSelectedsensorConfig] = useState("");


const handleDownload = () => {
  console.log("Download triggered");
  // Implement your download logic here
};


  const {Sensordata}=useAlldata();
  const Sensor1 = Array.isArray(Sensordata && Sensordata.Sensor1) ? Sensordata.Sensor1 : ["N/A"]; 
  const Sensor2 = Array.isArray(Sensordata && Sensordata.Sensor2) ? Sensordata.Sensor2 : ["N/A"]; 
  const Sensor3 = Array.isArray(Sensordata && Sensordata.Sensor3) ? Sensordata.Sensor3 : ["N/A"]; 
  const Sensor4 = Array.isArray(Sensordata && Sensordata.Sensor4) ? Sensordata.Sensor4 : ["N/A"]; 
  const Timestamp = Array.isArray(Sensordata && Sensordata.Timestamp) ? Sensordata.Timestamp : ["N/A"];  
  const colors = [
    { border: "#f2973b9c", gradientStart: "#91aafd28", gradientMid: "#f2973b" },
    { border: "#3b82f69c", gradientStart: "#a3e63528", gradientMid: "#3b82f6" },
    { border: "#34d3999c", gradientStart: "#f43f5e28", gradientMid: "#34d399" },
    { border: "#f871719c", gradientStart: "#38bdf828", gradientMid: "#f87171" },
  ];
 
  const data = {
    labels: [...Timestamp].reverse(),
    datasets: [Sensor1, Sensor2, Sensor3, Sensor4].map((sensorData, index) => ({
      label: `Sensor ${index + 1}`,
      data: [...sensorData].reverse(),
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null;
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, colors[index].gradientStart);
        gradient.addColorStop(0.5, colors[index].gradientMid);
        return gradient;
      },
      borderColor: colors[index].border,
      fill: true,
      tension: 0.2,
      borderWidth: 2,
      hidden: index > 0, // Hide datasets for Sensor2, Sensor3, Sensor4 initially
    })),
  };

  const options = useMemo(
    () => ({
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'white', // Color of legend labels
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.parsed.y} mm`;
            },
          },
        },
        zoom: {
          pan: {
            enabled: true,
            mode: "xy", // Allow panning in both x and y directions
          },
          zoom: {
            wheel: {
              enabled: true, // Zoom using the mouse wheel
            },
            pinch: {
              enabled: true, // Zoom using pinch gestures
            },
            mode: "xy", // Allow zooming in both x and y directions
          },
        },
      },
      scales: {
        y: {
          position: 'right',
          title: {
            display: true,
            text: 'Temperature(℃)',
            font: {
              weight: 'bold',
            },
            color: 'white',
          },
          grid: {
            color: '#aaaaaa',
          },
          ticks: {
            color: 'white',
            callback: function (value) {
              return value + ' ℃';
            },
          },
        },
        x: {
          title: {
            display: true,
            text: 'Timestamp',
            font: {
              weight: 'bold',
            },
            color: 'white',
          },
          ticks: {
            color: 'white',
          },
          grid: {
            color: '#aaaaaa',
          },
        },
      },
    }),
    []
  );

  const HandleButton=async(id)=>{
setActive(id);
  }

  const dropdown_options = [
    'Select', 'Sensor1', 'Sensor2', 'Sensor3', 'Sensor4','All Sensor'
  ];

  const defaultOption = dropdown_options[0];
  const generateAverageAnalyticsData = async (e) => {

  }
  return (
    <div className=' w-full text-white h-full md:flex gap-2 '>
      <div className='w-full h-[30%] md:h-full md:w-[40%] rounded-md flex justify-center items-center'>
      {Active_status === 1 ? (
          <div className="space-y-4 border border-gray-400 p-[10%] rounded-md">
           <form
                  className="flex flex-col items-center justify-center gap-6 2xl:gap-12 h-full"
                  onSubmit={generateAverageAnalyticsData}
                >
                  <div className='flex items-center gap-1 cursor-pointer' onClick={()=>setActive(0)}>
              <span className='text-[40px]'>
                <IoArrowBackCircle/>
              </span>
              <span className='text-[20px]'>
                Back
              </span>
              
            </div>
                  <center className="text-xl 2xl:text-2xl font-medium">
                    Select Date Range
                  </center>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-4 font-medium">
                      <div>Configuration</div>
                      <label>From</label>
                      <label>To</label>
                    </div>
                    <div className="flex flex-col gap-4">
                      <select
                        name="sensorConfiguration"
                        className="text-black rounded-md p-1 text-sm 2xl:text-base"
                        onChange={(e) =>
                          setSelectedsensorConfig(e.target.value)
                        }
                        value={SelectedsensorConfig}
                        required
                      >
                        <option value="" disabled>
                          Select Configuration
                          </option>
                          <option value="sensor1">Sensor 1</option>
                          <option value="sensor2">Sensor 2</option>
                          <option value="sensor3">Sensor 3</option>
                      </select>

                      <input
                        type="date"
                        className="text-black rounded-md px-0.5"
                        required
                        // value={fromDate}
                        // onChange={(e) => setFromDate(e.target.value)}
                      />
                      <input
                        type="date"
                        className="text-black rounded-md px-0.5"
                        required
                        // value={toDate}
                        // onChange={(e) => setToDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 font-medium">
                    <button
                      className="rounded-md bg-[#e4ba4c] hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-1 text-black"
                      type="submit"
                    >
                      <BiScatterChart className="text-lg" />
                      Plot Graph
                    </button>
                  </div>
                </form>
          </div>
        )   : Active_status === 2 ? (
          <div className="flex flex-col gap-4 2xl:gap-12 items-center justify-center border p-[10%] rounded-md">
                  <div className='flex items-center gap-1 cursor-pointer' onClick={()=>setActive(0)}>
                    <span className='text-[40px]'>
                      <IoArrowBackCircle/>
                    </span>
                    <span className='text-[20px]'>
                      Back
                    </span>
                    
                  </div>
                  <center className="text-xl 2xl:text-2xl font-medium">
                    Select Count
                  </center>
                  <div className="grid grid-cols-2 gap-2 md:gap-4 text-white">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="option1"
                        name="options"
                        value={100}
                        // checked={count === 100}
                        readOnly
                        className="cursor-pointer mr-1"
                        // onClick={() => {
                        //   setCount(100);
                        //   setEnableCount(false);
                        // }}
                      />
                      <label htmlFor="option1" className="cursor-pointer">
                        Last 100 Data
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="option2"
                        name="options"
                        value={500}
                        // checked={count === 500}
                        readOnly
                        className="cursor-pointer mr-1"
                        // onClick={() => {
                        //   setCount(500);
                        //   setEnableCount(false);
                        // }}
                      />
                      <label htmlFor="option2" className="cursor-pointer">
                        Last 500 Data
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="option3"
                        name="options"
                        value={1000}
                        // checked={count === 1000}
                        readOnly
                        className="cursor-pointer mr-1"
                        // onClick={() => {
                        //   setCount(1000);
                        //   setEnableCount(false);
                        // }}
                      />
                      <label htmlFor="option3" className="cursor-pointer">
                        Last 1000 Data
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="option4"
                        name="options"
                        className="cursor-pointer mr-1"
                        // checked={enableCount === true}
                        readOnly
                        // onClick={() => {
                        //   setCount(0);
                        //   setEnableCount(true);
                        // }}
                      />
                      <label htmlFor="option4" className="cursor-pointer">
                        Custom Count
                      </label>
                    </div>

                    {/* {enableCount && (
                      <>
                        <label htmlFor="count">Enter Count:</label>
                        <input
                          type="number"
                          id="count"
                          // value={count}
                          className="text-black w-32 rounded-md px-2"
                          // onChange={(e) =>
                          //   setCount(parseInt(e.target.value) || 0)
                          // }
                        />
                      </>
                    )} */}
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="rounded-md bg-[#e4ba4c] hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-1 text-black font-medium"
                      // onClick={generateAnalyticsData}
                    >
                      <BiScatterChart className="text-lg" />
                      Plot Graph
                    </button>
                  </div>
                </div>

        ) : Active_status === 3 ? (
          <div className='border p-[10%] rounded-md'>
            <form
                  className="flex flex-col items-center justify-center gap-6 2xl:gap-12"
                  onSubmit={generateAverageAnalyticsData}
                >
                   <div className='flex items-center gap-1 cursor-pointer' onClick={()=>setActive(0)}>
              <span className='text-[40px]'>
                <IoArrowBackCircle/>
              </span>
              <span className='text-[20px]'>
                Back
              </span>
              
            </div>
                  <center className="text-xl 2xl:text-2xl font-medium">
                    Select Date Range
                  </center>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-4 font-medium">
                      <div>Configuration</div>
                      <label>From</label>
                      <label>To</label>
                    </div>
                    <div className="flex flex-col gap-4">
                    <select
                        name="sensorConfiguration"
                        className="text-black rounded-md p-1 text-sm 2xl:text-base"
                        onChange={(e) =>
                          setSelectedsensorConfig(e.target.value)
                        }
                        value={SelectedsensorConfig}
                        required
                      >
                        <option value="" disabled>
                          Select Configuration
                          </option>
                          <option value="sensor1">Sensor 1</option>
                          <option value="sensor2">Sensor 2</option>
                          <option value="sensor3">Sensor 3</option>
                      </select>
                      <input
                        type="date"
                        className="text-black rounded-md px-0.5"
                        required
                        // value={avgFromDate}
                        // onChange={(e) => setAvgFromDate(e.target.value)}
                      />
                      <input
                        type="date"
                        className="text-black rounded-md px-0.5"
                        required
                        // value={avgToDate}
                        // onChange={(e) => setAvgToDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 text-sm 2xl:text-base font-medium">
                    <div className="text-center">Average By:</div>
                    <div className="flex gap-2 items-center text-black">
                      {/* <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          id="option1"
                          name="averageOption"
                          value={averageOption}
                          defaultChecked
                          className="cursor-pointer mt-0.5"
                          onChange={() => setAverageOption("minute")}
                        />
                        <label
                          htmlFor="option1"
                          className="mr-2 cursor-pointer"
                        >
                          Minute
                        </label>
                      </div> */}

                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          id="option2"
                          name="averageOption"
                          // value={averageOption}
                          defaultChecked
                          className="cursor-pointer mt-0.5"
                          // onChange={() => setAverageOption("hour")}
                        />
                        <label
                          htmlFor="option2"
                          className="mr-2 cursor-pointer text-white"
                        >
                          Hour
                        </label>
                      </div>

                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          id="option3"
                          name="averageOption"
                          // value={averageOption}
                          className="cursor-pointer mt-0.5"
                          // onChange={() => setAverageOption("day")}
                        />
                        <label
                          htmlFor="option3"
                          className="mr-2 cursor-pointer text-white"
                        >
                          Day
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 font-medium">
                    <button
                      className="rounded-md bg-[#e4ba4c] hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-1 text-black"
                      type="submit"
                    >
                      <BiScatterChart className="text-lg" />
                      Plot Graph
                    </button>
                  </div>
                </form>
          </div>
        ) :Active_status === 4 ? (
          <div className='border p-[10%] rounded-md'>
            <form
                  className="flex flex-col gap-4 py-4 md:py-8 px-5 md:px-10 items-center justify-center"
                  onSubmit={generateAverageAnalyticsData}
                >
                   <div className='flex items-center gap-1 cursor-pointer' onClick={()=>setActive(0)}>
              <span className='text-[40px]'>
                <IoArrowBackCircle/>
              </span>
              <span className='text-[20px]'>
                Back
              </span>
              
            </div>
                  <center className="text-xl font-medium">
                    Select Time Interval
                  </center>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-4 font-medium">
                      <div>Configuration</div>
                      <label>From</label>
                      <label>To</label>
                    </div>
                    <div className="flex flex-col gap-4">
                    <select
                        name="sensorConfiguration"
                        className="text-black rounded-md p-1 text-sm 2xl:text-base"
                        onChange={(e) =>
                          setSelectedsensorConfig(e.target.value)
                        }
                        value={SelectedsensorConfig}
                        required
                      >
                        <option value="" disabled>
                          Select Configuration
                          </option>
                          <option value="sensor1">Sensor 1</option>
                          <option value="sensor2">Sensor 2</option>
                          <option value="sensor3">Sensor 3</option>
                      </select>
                      <input
                        type="date"
                        className="text-black rounded-md px-0.5"
                        required
                        // value={intervalFromDate}
                        // onChange={(e) => setIntervalFromDate(e.target.value)}
                      />
                      <input
                        type="date"
                        className="text-black rounded-md px-0.5"
                        required
                        // value={intervalToDate}
                        // onChange={(e) => setIntervalToDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-sm 2xl:text-base font-medium">
                      Get 1 data for every -
                    </div>
                    <div className="flex gap-2 text-sm 2xl:text-base font-medium text-white">
                      {/* <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        id="intervaOption2"
                        name="intervalOptions"
                        value={intervalOption}
                        defaultChecked
                        className="cursor-pointer mt-0.5"
                        onChange={() => setIntervalOption("minute")}
                      />
                      <label
                        htmlFor="intervaOption2"
                        className="cursor-pointer"
                      >
                        Minute
                      </label>
                    </div> */}

                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          id="intervaOption1"
                          name="intervalOptions"
                          // value={intervalOption}
                          defaultChecked
                          className="cursor-pointer mt-0.5"
                          // onChange={() => setIntervalOption("hour")}
                        />
                        <label
                          htmlFor="intervaOption1"
                          className="cursor-pointer"
                        >
                          Hour
                        </label>
                      </div>

                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          id="intervaOption3"
                          name="intervalOptions"
                          // value={intervalOption}
                          className="cursor-pointer mt-0.5"
                          // onChange={() => setIntervalOption("day")}
                        />
                        <label
                          htmlFor="intervaOption3"
                          className="cursor-pointer"
                        >
                          Day
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="rounded-md bg-[#e4ba4c] hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-1 text-black font-medium"
                      type="submit"
                    >
                      <BiScatterChart className="text-lg" />
                      Plot Graph
                    </button>
                  </div>
                </form>
          </div>
        )
        : (
            <div className='w-[80%] h-[50%]  grid grid-cols-2 gap-2'>
              <div
                  className="border border-gray-500 rounded-md bg-gray-400 bg-opacity-30 flex justify-center items-center hover:bg-orange-400  gap-2 transform transition-transform duration-300 hover:scale-110 hover:mr-2 hover:mb-2 p-2 md:p-0 hover:cursor-pointer"
                  onClick={()=>HandleButton(1)}
                >            
                <div className=''><BsCalendar2Date className='text-[300%]'/></div>
                <div className='text-[17px]'>Date Picker</div>
              </div>
              <div
                  className="border border-gray-500 rounded-md bg-gray-400 bg-opacity-30 flex justify-center items-center hover:bg-orange-400  gap-2 transform transition-transform duration-300 hover:scale-110 hover:ml-2 hover:mb-2 p-2 md:p-0 hover:cursor-pointer"
                  onClick={()=>HandleButton(2)}
                >            <div className=''><PiClockCountdown className='text-[300%]'/></div>
                <div className='text-[17px]'>Count</div>
              </div>
              <div
                  className="border border-gray-500 rounded-md bg-gray-400 bg-opacity-30 flex justify-center items-center hover:bg-orange-400  gap-2 transform transition-transform duration-300 hover:scale-110 hover:mt-2 hover:mr-2 p-2 md:p-0 hover:cursor-pointer"
                  onClick={()=>HandleButton(3)}
                >            <div className=''><TbAlarmAverage className='text-[300%]'/></div>
                <div className='text-[17px]'>Average</div>
              </div>
              <div
                  className="border border-gray-500 rounded-md bg-gray-400 bg-opacity-30 flex justify-center items-center hover:bg-orange-400  gap-2 transform transition-transform duration-300 hover:scale-110 hover:ml-2 hover:mt-2 p-2 md:p-0 hover:cursor-pointer"
                  onClick={()=>HandleButton(4)}
                >
                  <div>
                    <BsSkipForwardCircle className="text-[300%]" />
                  </div>
                  <div className="text-[17px]">Interval</div>
                </div>
              </div>
          )}
        
      </div>
      <div className='w-full md:w-[60%] h-[60%] md:h-full border border-gray-500 rounded-md'>
        <div className='h-[7%] bg-gray-500 bg-opacity-50 '>
          col1
        </div>
        <div className='h-[93%] p-2 bg-gray-400  bg-opacity-20 '>
        <Line  data={data} width={"100%"} options={options}></Line>

        </div>
      </div>
    </div>
  )
}

export default Analytics
