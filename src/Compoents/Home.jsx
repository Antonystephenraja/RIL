import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { TbTemperatureSun } from "react-icons/tb";
import zoomPlugin from "chartjs-plugin-zoom"; 
import { TbDeviceDesktopCheck } from "react-icons/tb";
import { TbDeviceDesktopCancel } from "react-icons/tb";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import '../Css/Home.css'
import {
  Chart as ChartJS,
  registerables ,
  LineElement,
  Title,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { MdOutlineUpload } from "react-icons/md";
import { useAlldata } from '../AppRouteing/DataWrapping';
import Terminal from './Terminal';
import Utmaps from '../Modeling/Utmaps';
import Home_Model from '../Modeling/Home_Model';

// Register required Chart.js components
ChartJS.register(...registerables,LineElement,Title, LinearScale, CategoryScale, PointElement,zoomPlugin, Tooltip, Legend,Filler,annotationPlugin);

const Home = () => {
  const {Sensordata,terminalOutput,setTerminalOutput }=useAlldata();
  const [Minvalue,setMinValue]=useState('')
  const[MaxValue,setMaxValue]=useState('')
  const Sensor_status =Sensordata.activityStatus;


  const [DataLimit, setDeviceLimit] = useState(() => {
    return parseInt(localStorage.getItem("Limit")) || 1;
  });  

  const Sensor_Limits = Sensordata && Sensordata.LimitData? Sensordata.LimitData :'N/A';
  const S1_min_max = Sensordata?.sensorStats?.Sensor1 || 'N/A';
  const S2_min_max = Sensordata?.sensorStats?.Sensor2 || 'N/A';
  const S3_min_max = Sensordata?.sensorStats?.Sensor3 || 'N/A';
  const S4_min_max = Sensordata?.sensorStats?.Sensor4 || 'N/A';
  const Active_Last_Value = Sensordata && Sensordata.value ? Sensordata.value :['N/A']
  const Sensor1 = Array.isArray(Sensordata && Sensordata.Sensor1) ? Sensordata.Sensor1 : ["N/A"]; 
  const Sensor2 = Array.isArray(Sensordata && Sensordata.Sensor2) ? Sensordata.Sensor2 : ["N/A"]; 
  const Sensor3 = Array.isArray(Sensordata && Sensordata.Sensor3) ? Sensordata.Sensor3 : ["N/A"]; 
  const Sensor4 = Array.isArray(Sensordata && Sensordata.Sensor4) ? Sensordata.Sensor4 : ["N/A"]; 
  const Timestamp = Array.isArray(Sensordata && Sensordata.Timestamp) ? Sensordata.Timestamp : ["N/A"]; 

  const colors = [
    { bg: "#ff9e00" },
    { bg: "#7bff63"},
    { bg: "#ffffff"},
    { bg: "#fbff00"},
  ];

  const alerts = [
    (parseInt(Sensor_Limits.MinLimit) > parseInt(Active_Last_Value.Sensor1)) && `Sensor1 has exceeded the minimum Temperature at ${Active_Last_Value.Time}.`,
    (parseInt(Sensor_Limits.MaxLimit) < parseInt(Active_Last_Value.Sensor1)) && `Sensor1 has exceeded the maximum Temperature at  ${Active_Last_Value.Time}.`,

    (parseInt(Sensor_Limits.MinLimit) > parseInt(Active_Last_Value.Sensor2)) && `Sensor2 has exceeded the minimum Temperature at  ${Active_Last_Value.Time}.`,
    (parseInt(Sensor_Limits.MaxLimit) < parseInt(Active_Last_Value.Sensor2)) && `Sensor2 has exceeded the maximum Temperature at  ${Active_Last_Value.Time}.`,

    (parseInt(Sensor_Limits.MinLimit) > parseInt(Active_Last_Value.Sensor3)) && `Sensor3 has exceeded the minimum Temperature at  ${Active_Last_Value.Time}.`,
    (parseInt(Sensor_Limits.MaxLimit) < parseInt(Active_Last_Value.Sensor3)) && `Sensor3 has exceeded the maximum Temperature at  ${Active_Last_Value.Time}.`,


  ].filter(Boolean);
  const data = {
    labels: [...Timestamp].reverse(), 
    datasets: [Sensor1, Sensor2, Sensor3].map((sensorData, index) => ({
      label: `Sensor ${index + 1}`,
      data: [...sensorData].reverse(),
      borderColor: colors[index].bg,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      fill: false,
      tension: 0.4,
      borderWidth: 2,
      hidden: index > 0,
    })),
  };

const options = useMemo(() => {
  // Ensure limits are valid before setting options
  if (Sensordata?.LimitData?.MinLimit != null && Sensordata?.LimitData?.MaxLimit != null) {
    const limitdata = Sensordata.LimitData;
    const Minimium_Limits = parseInt(limitdata.MinLimit);
    const Maximium_Limits = parseInt(limitdata.MaxLimit);

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'white', 
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.parsed.y} mm`;
            },
          },
        },
        annotation: {
          annotations: {
            thresholdLine1: {
              type: 'line',
              yMin: Minimium_Limits,
              yMax: Minimium_Limits,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [6, 6],
              label: {
                content: `Threshold(${Minimium_Limits})`,
                enabled: true,
                position: 'end',
                backgroundColor: 'rgba(255,0,0,0.7)',
                color: 'white',
              },
            },
            thresholdLine2: {
              type: 'line',
              yMin: Maximium_Limits,
              yMax: Maximium_Limits,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [6, 6],
              label: {
                content: `Threshold(${Maximium_Limits})`,
                enabled: true,
                position: 'end',
                backgroundColor: 'rgba(255,0,0,0.7)',
                color: 'white',
              },
            },
          },
        },
        zoom: {
          pan: {
            enabled: true,
            mode: "xy",
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "xy",
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
            font: {
              size: 7,
            },
          },
          grid: {
            color: '#aaaaaa',
          },
        },
      },
    };
  } else {
    console.log("Limit data is not available yet.");
    return {}; // Return an empty configuration or a default setup
  }
}, [Sensordata]);



  const limit_button = (id) => {
    localStorage.setItem("Limit", id+"hr"); 
    setDeviceLimit(id);
  };

  const limit = (id) => {
    return `border flex justify-center items-center mb-1 mt-1 text-[10px] p-2 hover:cursor-pointer transform transition-transform duration-300 hover:scale-110 ${DataLimit === id ? "bg-[#f2973b] bg-opacity-90" : ""}`;
  };
  

  
  // Prevent special characters and letters
  const handleKeyDown = (e) => {
    if (
      ["e", "E", "+", "-", ".", ","].includes(e.key) || // Disallow these keys
      isNaN(Number(e.key)) && e.key !== "Backspace" && e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  const Limit_submit = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      if (!Minvalue && !MaxValue) {
        console.log("Both values are empty");
        return;
      }
      const payload = {};
      if (Minvalue) payload.Minvalue = Minvalue;
      if (MaxValue) payload.MaxValue = MaxValue;
      const id = Minvalue && MaxValue ? 3 : Minvalue ? 1 : 2;
      const res = await fetch(`${apiUrl}/backend/InserLimit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...payload }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        console.log(`Error: ${res.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
    setMinValue("");
    setMaxValue("");
  };
  return (
    <div className="md:h-full h-full w-full md:w-full space-y-2 text-white">
      <div className="h-[650px] md:h-[49%] md:flex gap-2">
        <div className="h-[250px] md:h-[100%] w-full md:w-[50%] space-y-2">
          <div className="h-[10%] md:h-[8.5%] 2xl:h-[10%] flex justify-end">
            <div className="flex justify-center text-[15x]">
              <span className="">Last updated time: {Active_Last_Value.Time}</span>
            </div>
          </div>
          <div className="h-full md:h-[88.5%] w-full space-y-2">
            <div className="flex justify-around h-[40%] md:h-[48%] w-full gap-2">
              <div className="border bg-gray-400 bg-opacity-30 border-gray-500 w-[50%] rounded-md">
                <span className="ml-1 flex 2xl:text-[150%] justify-center">Sensor1</span>
                <div className='flex justify-center items-center gap-2 mt-3'>
                  <span><TbTemperatureSun className='text-6xl 2xl:text-8xl text-gray-300'/></span>
                  <span className='text-2xl 2xl:text-4xl font-bold '>{Active_Last_Value.Sensor1}℃</span>
                </div>
              </div>
              <div className="border bg-gray-400 bg-opacity-30 border-gray-500 w-[50%] rounded-md">
                <span className="ml-1 flex justify-center 2xl:text-[150%]">Sensor2</span>
                <div className='flex justify-center items-center gap-2 mt-3'>
                  <span><TbTemperatureSun className='text-6xl 2xl:text-8xl text-gray-300'/></span>
                  <span className='text-2xl font-bold   2xl:text-4xl'>{Active_Last_Value.Sensor2} ℃</span>
                </div>
              </div>
            </div>
            <div className="flex justify-around h-[40%] md:h-[48%] w-full gap-2">
            <div className="border bg-gray-400 bg-opacity-30 border-gray-500 w-[50%] rounded-md">
                <span className="ml-1 flex justify-center 2xl:text-[150%]">Sensor3</span>
                <div className='flex justify-center items-center gap-2 mt-3'>
                  <span><TbTemperatureSun className='text-6xl 2xl:text-8xl text-gray-300'/></span>
                  <span className='text-2xl font-bold  2xl:text-4xl'>{Active_Last_Value.Sensor3} ℃</span>
                </div>
              </div>
              <div className="border bg-gray-400 bg-opacity-30 border-gray-500 w-[50%] rounded-md">
                <div className="h-[23%] bg-gray-500 bg-opacity-70 text-white px-2 py-1">
                  Terminal Info
                </div>
                <div className="h-[76%]"  >
                  <Terminal output={terminalOutput}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[300px] md:h-full md:w-[50%] justify-between md:flex text-white space-y-2 md:space-y-0 gap-2">
          <div className='border bg-white bg-opacity-60 border-gray-500 h-[49%] md:h-full rounded-md w-full md:w-[50%] flex justify-center items-center'>
            <Home_Model/>
          </div>
          <div className='h-[29%] md:h-full gap-2 w-full space-y-2 md:w-[50%]'>
            <div className='h-[100%] md:h-[29%] w-full md:w-full border border-gray-500  rounded-md'>
              <div className='bg-gray-500  bg-opacity-70 flex justify-between '>
                <span className=''>Device Info</span>
                {Sensor_status === 'active'?(
                  <span className='border border-gray-400 rounded-sm bg-green-400 text-black text-[10px] m-1 flex gap-1 items-center'>
                    <TbDeviceDesktopCheck/>
                    Active
                  </span>
                ):(
                  <span className='border border-gray-400 h-[10%] rounded-sm bg-red-400 text-black text-[10px] m-1 flex gap-1 items-center'>
                  <TbDeviceDesktopCancel/>
                  Inactive
                  </span>
                )}
                
              </div>
                {/* Form Section */}
              <div className="p-0.5 h-[72%] bg-gray-400 bg-opacity-30">
              <form
                className="space-y-1"
                onSubmit={(e) => e.preventDefault()} // Prevent form submission reload
              >
            {/* Input Group */}
            <div className="flex w-full h-full gap-2">
              <div className="w-[80%] mt-0.5">
                {/* Min Value Input */}
                <div className="flex mb-0.5">
                  <label htmlFor="fname1" className="text-white text-[8px] 2xl:text-[13px]">
                    Min Value
                  </label>
                  <input
                    type="text"
                    id="fname1"
                    value={Minvalue}
                    name="fname1"
                    onChange={(e) => setMinValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onPaste={(e) => e.preventDefault()}
                    placeholder="Enter Minimum Value"
                    className="p-1 border rounded-md text-black text-[10px] 2xl:text-[15px] h-[10%] w-full"
                  />
                </div>

                {/* Max Value Input */}
                <div className="flex">
                  <label htmlFor="fname2" className="text-white text-[8px] 2xl:text-[13px]">
                    Max Value
                  </label>
                  <input
                    type="text"
                    id="fname2"
                    value={MaxValue}
                    name="fname2"
                    onChange={(e) => setMaxValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onPaste={(e) => e.preventDefault()}
                    placeholder="Enter Maximum Value"
                    className="p-1 border rounded-md text-black text-[10px] 2xl:text-[15px] h-[10%] w-full"
                  />
                </div>
              </div>

                {/* Submit Button */}
                <div
                  className="w-[20%] p-1 flex justify-center items-center hover:cursor-pointer transform transition-transform duration-300 hover:scale-110"
                  onClick={Limit_submit}>
                  <MdOutlineUpload className="text-[40px] bg-orange-400 rounded-md" />
                </div>
              </div>
            </form>
    
              </div>
            </div>
            <div className="h-[150px] w-full md:h-[68%] md:w-full border border-gray-500 rounded-md">
              <div className="h-[18%] bg-gray-500 bg-opacity-70 text-white px-2 py-1">
                Alert
              </div>
              <div className="h-[82%] bg-gray-400 bg-opacity-30 space-y-2 p-2 overflow-auto"style={{scrollbarWidth: "thin",scrollbarColor: "#ffffff transparent",}} >
                  {alerts.map((alert, index) => (
                <div key={index} className='bg-gray-500 bg-opacity-70 h-[20%] rounded-md flex items-center gap-1'>
                  <span className='ml-1 text-2xl text-red-500 blinking'><IoWarning /></span>
                  <span className='text-[7px] 2xl:text-[12px]'>{alert}</span>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[450px] md:h-[50%] gap-2 space-y-2 md:space-y-0">
        <div className="w-full   md:w-[100%] h-[60%]  md:h-full border border-gray-500 rounded-md">
          <div className="h-[10%] bg-gray-500 bg-opacity-70 flex justify-between items-center">
            <span className="m-2">Live Trend</span>
            <div className='flex'>
              <span className='text-[10px] md:text-[15px] 2xl:text-[18px]'>S1:</span>
              <div className=' ml-1 text-[6px] md:text-[10px] 2xl:text-[12px]'>
                <div className='flex gap-1 items-center'>
                  <span className='text-red-500'><FaTemperatureArrowUp/></span>
                  <span>{S1_min_max.maxValue} ℃</span>
                </div>
                <div className='flex gap-1 items-center'>
                  <span className='text-green-500'><FaTemperatureArrowDown /></span>
                  <span>{S1_min_max.minValue} ℃</span>
                </div>
              </div>
            </div>
            <div className='flex'>
              <span className='text-[10px] md:text-[15px] 2xl:text-[18px]'>S2:</span>
              <div className=' ml-1 text-[6px] md:text-[10px] 2xl:text-[12px]'>
                <div className='flex gap-1 items-center'>
                  <span className='text-red-500'><FaTemperatureArrowUp/></span>
                  <span>{S2_min_max.maxValue} ℃</span>
                </div>
                <div className='flex gap-1 items-center'>
                  <span className='text-green-500'><FaTemperatureArrowDown /></span>
                  <span>{S2_min_max.minValue} ℃</span>
                </div>
              </div>
            </div>
            <div className='flex'>
              <span className='text-[10px] md:text-[15px] 2xl:text-[18px]'>S3:</span>
              <div className=' ml-1 text-[6px] md:text-[10px] 2xl:text-[12px]'>
              <div className='flex gap-1 items-center'>
                  <span className='text-red-500'><FaTemperatureArrowUp/></span>
                  <span>{S3_min_max.maxValue} ℃</span>
                </div>
                <div className='flex gap-1 items-center'>
                  <span className='text-green-500'><FaTemperatureArrowDown /></span>
                  <span>{S3_min_max.minValue} ℃</span>
                </div>
              </div>
            </div>
            {/* <div className='flex'>
              <span className='text-[10px] md:text-[15px] 2xl:text-[18px]'>S4:</span>
              <div className=' ml-1 text-[6px] md:text-[10px] 2xl:text-[12px]'>
              <div className='flex gap-1 items-center'>
                  <span className='text-red-500'><FaTemperatureArrowUp/></span>
                  <span>{S4_min_max.maxValue} ℃</span>
                </div>
                <div className='flex gap-1 items-center'>
                  <span className='text-green-500'><FaTemperatureArrowDown /></span>
                  <span>{S4_min_max.minValue} ℃</span>
                </div>
              </div>
            </div> */}
            <div className=' flex gap-3 mr-2 h-full'> 
              <span className={limit(1)} onClick={() => limit_button(1)}>1 hr</span>
              <span className={limit(3)} onClick={() => limit_button(3)}>3 hrs</span>
              <span className={limit(5)} onClick={() => limit_button(5)}>5 hrs</span>
            </div>
          </div>
    
          <div className="h-[90%] bg-gray-400 bg-opacity-30">
            <div className='w-full h-full'>
              <Line data={data} width={"100%"}  options={options} />
            </div>
           
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
