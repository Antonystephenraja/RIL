import React, { useMemo, useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { PiClockCountdown } from "react-icons/pi";
import { TbAlarmAverage } from "react-icons/tb";
import { BsSkipForwardCircle } from "react-icons/bs";
import { Line } from "react-chartjs-2";
import axios from "axios";
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
} from "chart.js";
import { FaChartLine } from "react-icons/fa6";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropdown/style.css";
import { IoArrowBackCircle } from "react-icons/io5";
// Register required Chart.js components
ChartJS.register(
  LineElement,
  Title,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);
const Analytics = () => {
  const [Active_status, setActive] = useState();
  const [count, setCount] = useState();

  const [selectedSensor, setSelectedSensor] = useState(null); // Null = Show all
  const [avgFromDate, setAvgFromDate] = useState("");
  const [avgToDate, setAvgToDate] = useState("");
  const [averageOption, setAverageOption] = useState("hour");
  const [intervalFromDate, setIntervalFromDate] = useState("");
  const [intervalToDate, setIntervalToDate] = useState("");
  const [intervalOption, setIntervalOption] = useState("hour");
  const [enableCount, setEnableCount] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [Sensordatas, setSensorData] = useState("");
  const [infostatus,setStatus]=useState(true)
  const apiUrl = process.env.REACT_APP_API_URL;

  const width_value = "50"
  let sensor1Data = [];
  let sensor2Data = [];
  let sensor3Data = [];
  let timestamp = [];


  const backbutton =()=>{
    setStatus(true);
  }
  if (Active_status === 1 || Active_status === 2 || Active_status === 4) {
    sensor1Data =
      Sensordatas && Array.isArray(Sensordatas)
        ? Sensordatas.map((item) => item.Sensor1).filter(
            (value) => value !== undefined && value !== null
          )
        : [];

    sensor2Data =
      Sensordatas && Array.isArray(Sensordatas)
        ? Sensordatas.map((item) => item.Sensor2).filter(
            (value) => value !== undefined && value !== null
          )
        : [];

    sensor3Data =
      Sensordatas && Array.isArray(Sensordatas)
        ? Sensordatas.map((item) => item.Sensor3).filter(
            (value) => value !== undefined && value !== null
          )
        : [];
    timestamp =
      Sensordatas && Array.isArray(Sensordatas)
        ? Sensordatas.map((item) => item.Time).filter(
            (value) => value !== undefined && value !== null
          )
        : [];
  } else if (Active_status === 3) {
    sensor1Data =
      Sensordatas && Array.isArray(Sensordatas)
        ? Sensordatas.map((item) => item.avgS1).filter(
            (value) => value !== undefined && value !== null
          )
        : [];
    sensor2Data =
      Sensordatas && Array.isArray(Sensordatas)
        ? Sensordatas.map((item) => item.avgS2).filter(
            (value) => value !== undefined && value !== null
          )
        : [];
    sensor3Data =
      Sensordatas && Array.isArray(Sensordatas)
        ? Sensordatas.map((item) => item.avgS3).filter(
            (value) => value !== undefined && value !== null
          )
        : [];

    timestamp =
      Sensordatas && Array.isArray(Sensordatas)
        ? Sensordatas.map((item) => item.dateRange).filter(
            (value) => value !== undefined && value !== null
          )
        : [];
  }


  const colors = [
    { bg: "#ff9e00" },
    { bg: "#d492fc" },
    { bg: "#00e9fc" },
    { bg: "#fbff00" },
  ];

  const isNoData = [sensor1Data, sensor2Data, sensor3Data].every(
    (sensor) => !sensor || sensor.length === 0 || sensor.every((val) => val === "N/A")
  );
   const datasets = selectedSensor === null
   ? [
       { label: "Sensor 1", data: [...sensor1Data].reverse(), borderColor: colors[0].bg },
       { label: "Sensor 2", data: [...sensor2Data].reverse(), borderColor: colors[1].bg },
       { label: "Sensor 3", data: [...sensor3Data].reverse(), borderColor: colors[2].bg },
     ]
   : [
       {
         label: `Sensor ${selectedSensor + 1}`,
         data: [...[sensor1Data, sensor2Data, sensor3Data][selectedSensor]].reverse(),
         borderColor: colors[selectedSensor].bg,
       },
     ];

const gridHoverLine = {
  id: "gridHoverLine",
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chart._active || chart._active.length === 0) return;
    const mouseEvent = chart.tooltip;
    const x = mouseEvent.caretX;
    const y = chart._lastEvent?.y ?? mouseEvent.caretY;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.5;
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.moveTo(chartArea.left, y);
    ctx.lineTo(chartArea.right, y);
    ctx.stroke();
    ctx.restore();
  },
};
ChartJS.register(gridHoverLine);

const data = {
   labels: [...timestamp].reverse(),
   datasets: datasets.map((sensor, index) => ({
     ...sensor,
     fill: false,
     pointRadius: 0,
     pointHoverRadius: 2,
     tension: 0.2,
     borderWidth: 3,
     backgroundColor: sensor.borderColor,
   })),
 };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "white", // Color of legend labels
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} °C`;
          },
        },
      },
      zoom: {
        pan: {
          enabled: false,
          mode: "xy", // Allow panning in both x and y directions
        },
        zoom: {
          wheel: {
            enabled: true, // Zoom using the mouse wheel
          },
          drag: {
            enabled: true,
            backgroundColor: "rgba(202, 232, 211, 0.6)",
            borderColor: "white",
            borderWidth: 1,
          },
          pinch: {
            enabled: true, // Zoom using pinch gestures
          },
          mode: "xy", // Allow zooming in both x and y directions
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        position: "right",
        title: {
          display: true,
          text: "Temperature(℃)",
          font: {
            weight: "bold",
          },
          color: "white",
        },
        grid: {
          color: "#4b5563",
        },
        ticks: {
          color: "white",
          callback: function (value) {
            return value + " ℃";
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Timestamp",
          font: {
            weight: "bold",
          },
          color: "white",
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "#4b5563",
        },
      },
    },
  };

  const HandleButton = async (id) => {
    setActive(id);
    setSensorData("");
  };

  const generateAverageExcel = async (e) => {
    try {
      setStatus(false)
      e.preventDefault();
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/backend/getRilAverageReport`,
        {
          params: {
            // projectName: projectName,
            avgFromDate: avgFromDate,
            avgToDate: avgToDate,
            averageOption: averageOption,
            intervalFromDate: intervalFromDate,
            intervalToDate: intervalToDate,
            intervalOption: intervalOption,
          },
        }
      );
      setLoading(false);
      if (response.data) {
        const datas = response.data.data;
        setSensorData(datas);
      } else if (response.data && response.data.length === 0) {
        alert("No data found");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const generateExcel = async (e) => {
    try {
      console.log("yess")
      setStatus(false)
      e.preventDefault();
      setLoading(true);
      const response = await axios.get(`${apiUrl}/backend/getRilReport`, {
        params: {
          // projectName: projectName,
          fromDate: fromDate,
          toDate: toDate,
          count: count,
        },
      });
      setLoading(false);
      if (response.data && response.data.length > 0) {
        setSensorData(response.data);
      } else if (response.data && response.data.length === 0) {
        alert("No data found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" w-full text-white h-full md:flex gap-2 ">
      { infostatus === true ?
      (
        <div className="w-full h-[30%] md:h-full md:w-[40%] rounded-md flex justify-center items-center">
        {Active_status === 1 ? (
          <div className="space-y-4 border border-gray-400 p-[10%] rounded-md">
            <form
              className="flex flex-col items-center justify-center gap-6 2xl:gap-12 h-full"
              onSubmit={generateExcel}
            >
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => {
                  setActive(0);
                  setFromDate("");
                  setToDate("");
                  setCount();
                  setEnableCount(false);
                  setAvgFromDate("");
                  setAvgToDate("");
                  setIntervalFromDate("");
                  setIntervalToDate("");
                  setAverageOption("hour");
                  setIntervalOption("hour");
                }}
              >
                <span className="text-[40px]">
                  <IoArrowBackCircle />
                </span>
                <span className="text-[20px]">Back</span>
              </div>
              <center className="text-xl font-medium">Select Date Range</center>
              <div className="flex gap-2">
                <div className="flex flex-col gap-4 font-medium">
                  <label>From</label>
                  <label>To</label>
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    type="date"
                    className="text-black rounded-md px-0.5"
                    required
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />

                  <input
                    type="date"
                    className="text-black rounded-md px-0.5"
                    required
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center gap-4 font-medium">
                <button
                  type="submit"
                  className="rounded-md bg-orange-400 hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-1 text-white"
                >
                  <FaChartLine className="text-lg" />
                  Plot
                </button>
              </div>
            </form>
          </div>
        ) : Active_status === 2 ? (
          <form
            className="flex flex-col gap-4 py-4 md:py-8 px-5 md:px-10 items-center justify-center border rounded-md"
            onSubmit={generateExcel}
          >
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => {
                setActive(0);
                setFromDate("");
                setToDate("");
                setCount();
                setEnableCount(false);
                setAvgFromDate("");
                setAvgToDate("");
                setIntervalFromDate("");
                setIntervalToDate("");
                setAverageOption("hour");
                setIntervalOption("hour");
              }}
            >
              <span className="text-[40px]">
                <IoArrowBackCircle />
              </span>
              <span className="text-[20px]">Back</span>
            </div>
            <center className="text-xl font-medium">Select Count</center>
            <div className="flex flex-col gap-2 md:gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="option1"
                  name="options"
                  value={100}
                  checked={count === 100}
                  readOnly
                  className="cursor-pointer mr-1"
                  onClick={() => {
                    setCount(100);
                    setEnableCount(false);
                  }}
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
                  checked={count === 500}
                  readOnly
                  className="cursor-pointer mr-1"
                  onClick={() => {
                    setCount(500);
                    setEnableCount(false);
                  }}
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
                  checked={count === 1000}
                  readOnly
                  className="cursor-pointer mr-1"
                  onClick={() => {
                    setCount(1000);
                    setEnableCount(false);
                  }}
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
                  checked={enableCount === true}
                  readOnly
                  onClick={() => {
                    setCount(0);
                    setEnableCount(true);
                  }}
                />
                <label htmlFor="option4" className="cursor-pointer">
                  Custom Count
                </label>
              </div>

              {enableCount && (
                <>
                  <label htmlFor="count">Enter Count:</label>
                  <input
                    type="number"
                    id="count"
                    required
                    value={count}
                    className="text-black w-32 rounded-md px-2"
                    onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                  />
                </>
              )}
            </div>
            <div className="flex gap-4">
              <button
                className="rounded-md bg-orange-400 hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-1 font-medium text-white"
                type="submit"
              >
                <FaChartLine className="text-lg" />
                Plot
              </button>
            </div>
          </form>
        ) : Active_status === 3 ? (
          <div className="border p-[10%] rounded-md">
            <form
              className="flex flex-col items-center justify-center gap-6 2xl:gap-12"
              onSubmit={generateAverageExcel}
            >
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => {
                  setActive(0);
                  setFromDate("");
                  setToDate("");
                  setCount();
                  setEnableCount(false);
                  setAvgFromDate("");
                  setAvgToDate("");
                  setIntervalFromDate("");
                  setIntervalToDate("");
                  setAverageOption("hour");
                  setIntervalOption("hour");
                }}
              >
                <span className="text-[40px]">
                  <IoArrowBackCircle />
                </span>
                <span className="text-[20px]">Back</span>
              </div>
              <center className="text-xl font-medium">Select Date Range</center>
              <div className="flex gap-2">
                <div className="flex flex-col gap-4 font-medium">
                  <label>From</label>
                  <label>To</label>
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    type="date"
                    className="text-black rounded-md px-0.5"
                    required
                    value={avgFromDate}
                    onChange={(e) => setAvgFromDate(e.target.value)}
                  />
                  <input
                    type="date"
                    className="text-black rounded-md px-0.5"
                    required
                    value={avgToDate}
                    onChange={(e) => setAvgToDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm 2xl:text-base font-medium">
                <div className="text-center ">Average By:</div>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="option2"
                      name="averageOption"
                      value={averageOption}
                      defaultChecked
                      className="cursor-pointer mt-0.5"
                      onChange={() => setAverageOption("hour")}
                    />
                    <label htmlFor="option2" className="mr-2 cursor-pointer">
                      Hour
                    </label>
                  </div>

                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="option3"
                      name="averageOption"
                      value={averageOption}
                      className="cursor-pointer mt-0.5"
                      onChange={() => setAverageOption("day")}
                    />
                    <label htmlFor="option3" className="mr-2 cursor-pointer">
                      Day
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 font-medium">
                <button
                  type="submit"
                  className="rounded-md bg-orange-400 hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-1 text-white"
                >
                  <FaChartLine className="text-lg" />
                  Plot
                </button>
              </div>
            </form>
          </div>
        ) : Active_status === 4 ? (
          <div className="border p-[10%] rounded-md">
            <form
              className="flex flex-col gap-4 py-4 md:py-8 px-5 md:px-10 items-center justify-center"
              onSubmit={generateAverageExcel}
            >
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => {
                  setActive(0);
                  setFromDate("");
                  setToDate("");
                  setCount();
                  setEnableCount(false);
                  setAvgFromDate("");
                  setAvgToDate("");
                  setIntervalFromDate("");
                  setIntervalToDate("");
                  setAverageOption("hour");
                  setIntervalOption("hour");
                }}
              >
                <span className="text-[40px]">
                  <IoArrowBackCircle />
                </span>
                <span className="text-[20px]">Back</span>
              </div>
              <center className="text-xl font-medium">
                Select Time Interval
              </center>
              <div className="flex gap-2">
                <div className="flex flex-col gap-4 font-medium">
                  <label>From</label>
                  <label>To</label>
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    type="date"
                    className="text-black rounded-md px-0.5"
                    required
                    value={intervalFromDate}
                    onChange={(e) => setIntervalFromDate(e.target.value)}
                  />

                  <input
                    type="date"
                    className="text-black rounded-md px-0.5"
                    required
                    value={intervalToDate}
                    onChange={(e) => setIntervalToDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-sm 2xl:text-base font-medium">
                Get 1 data for every -
              </div>
              <div className="flex gap-2 text-sm 2xl:text-base font-medium">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="intervaOption1"
                    name="intervalOptions"
                    value={intervalOption}
                    defaultChecked
                    className="cursor-pointer mt-0.5"
                    onChange={() => setIntervalOption("hour")}
                  />
                  <label htmlFor="intervaOption1" className="cursor-pointer">
                    Hour
                  </label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="intervaOption3"
                    name="intervalOptions"
                    value={intervalOption}
                    className="cursor-pointer mt-0.5"
                    onChange={() => setIntervalOption("day")}
                  />
                  <label htmlFor="intervaOption3" className="cursor-pointer">
                    Day
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="rounded-md bg-orange-400 hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-1 text-white font-medium"
                >
                  <FaChartLine className="text-lg" />
                  Plot
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-[80%] h-[50%]  grid grid-cols-2 gap-2">
            <div
              className="border border-gray-500 rounded-md bg-gray-400 bg-opacity-30 flex justify-center items-center hover:bg-orange-400  gap-2 transform transition-transform duration-300 hover:scale-110 hover:mr-2 hover:mb-2 p-2 md:p-0 hover:cursor-pointer"
              onClick={() => {
                HandleButton(1);
                setCount();
                setEnableCount(false);
                setAvgFromDate("");
                setAvgToDate("");
                setIntervalFromDate("");
                setIntervalToDate("");
                setAverageOption("hour");
                setIntervalOption("hour");
              }}
            >
              <div className="">
                <BsCalendar2Date className="text-[300%]" />
              </div>
              <div className="text-[17px]">Date Picker</div>
            </div>
            <div
              className="border border-gray-500 rounded-md bg-gray-400 bg-opacity-30 flex justify-center items-center hover:bg-orange-400  gap-2 transform transition-transform duration-300 hover:scale-110 hover:ml-2 hover:mb-2 p-2 md:p-0 hover:cursor-pointer"
              onClick={() => {
                HandleButton(2);
                setCount(100);
                setFromDate("");
                setToDate("");
                setEnableCount(false);
                setAvgFromDate("");
                setAvgToDate("");
                setIntervalFromDate("");
                setIntervalToDate("");
                setAverageOption("hour");
                setIntervalOption("hour");
              }}
            >
              {" "}
              <div className="">
                <PiClockCountdown className="text-[300%]" />
              </div>
              <div className="text-[17px]">Count</div>
            </div>
            <div
              className="border border-gray-500 rounded-md bg-gray-400 bg-opacity-30 flex justify-center items-center hover:bg-orange-400  gap-2 transform transition-transform duration-300 hover:scale-110 hover:mt-2 hover:mr-2 p-2 md:p-0 hover:cursor-pointer"
              onClick={() => {
                HandleButton(3);
                setFromDate("");
                setToDate("");
                setCount();
                setEnableCount(false);
                setIntervalFromDate("");
                setIntervalToDate("");
                setAverageOption("hour");
                setIntervalOption("hour");
              }}
            >
              {" "}
              <div className="">
                <TbAlarmAverage className="text-[300%]" />
              </div>
              <div className="text-[17px]">Average</div>
            </div>
            <div
              className="border border-gray-500 rounded-md bg-gray-400 bg-opacity-30 flex justify-center items-center hover:bg-orange-400  gap-2 transform transition-transform duration-300 hover:scale-110 hover:ml-2 hover:mt-2 p-2 md:p-0 hover:cursor-pointer"
              onClick={() => {
                HandleButton(4);
                setFromDate("");
                setToDate("");
                setCount();
                setEnableCount(false);
                setAvgFromDate("");
                setAvgToDate("");
                setAverageOption("hour");
                setIntervalOption("hour");
              }}
            >
              <div>
                <BsSkipForwardCircle className="text-[300%]" />
              </div>
              <div className="text-[17px]">Interval</div>
            </div>
          </div>
        )}
      </div>
      ):(<div>

        </div>)
    }
      

      <div className={`${infostatus === false ? "w-full md:w-[100%]": "w-full md:w-[60%]"} h-[60%] md:h-full border border-gray-500 rounded-md`}>
        <div className="h-[7%] bg-gray-500 bg-opacity-50 flex items-center text-[20px] p-2 gap-1 cursor-pointer" onClick={backbutton}>
          {
            infostatus === false ? (
              <div className="flex">
              <IoArrowBackCircle className="text-[30px]"/> <span className="text-[15px] mt-1">Back</span>

              </div>
            ):(
              <div></div>
            )
          }
        </div>
        <div className="h-[93%] p-2 bg-gray-400  bg-opacity-20 ">
          <div className="flex gap-4 justify-center items-center text-white">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sensor"
                checked={selectedSensor === null}
                onChange={() => setSelectedSensor(null)}
                className="w-4 h-4"
              />
              <span className="text-white">Show All</span>
            </label>

            {[sensor1Data, sensor2Data, sensor3Data].map((_, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sensor"
                  value={index}
                  checked={selectedSensor === index}
                  onChange={() => setSelectedSensor(index)}
                  className="w-4 h-4"
                />
                <span style={{ color: colors[index].bg }}>{`Sensor ${index + 1}`}</span>
              </label>
            ))}
          </div>
          {isNoData ? (
            <div className="text-center text-white text-lg font-bold mt-6">
              No data found! Please select an option to view the trend.
            </div>
            ) : (
              <Line data={data} width={"100%"} options={options}></Line>
            )}
        </div>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center font-semibold text-sm">
          <div>Your report is being downloaded!</div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
