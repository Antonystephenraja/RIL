import React, { useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { PiClockCountdown } from "react-icons/pi";
import { TbAlarmAverage } from "react-icons/tb";
import { BsSkipForwardCircle } from "react-icons/bs";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileDownload } from "react-icons/fa";
import axios from "axios";

const Report = () => {
  const [selectedReportOption, setSelectedReportOption] =
    useState("datePicker");
  const [count, setCount] = useState();
  const [enableCount, setEnableCount] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [avgFromDate, setAvgFromDate] = useState("");
  const [avgToDate, setAvgToDate] = useState("");
  const [averageOption, setAverageOption] = useState("hour");
  const [intervalFromDate, setIntervalFromDate] = useState("");
  const [intervalToDate, setIntervalToDate] = useState("");
  const [intervalOption, setIntervalOption] = useState("hour");
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const generateExcel = async (e) => {
    try {
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
        const ws = XLSX.utils.json_to_sheet(response.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const info = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(info, `RIL_Report.xlsx`);
      } else if (response.data && response.data.length === 0) {
        alert("No data found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const generateAverageExcel = async (e) => {
    try {
      // console.log("before api");

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
      // console.log("average response ", response.data.data);

      if (response.data.data && response.data.data.length > 0) {
        const ws = XLSX.utils.json_to_sheet(response.data.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const info = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(info, `RIL_Report.xlsx`);
      } else if (response.data.data && response.data.data.length === 0) {
        alert("No data found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full space-y-2 m-2">
      <div className="h-[27%] md:h-[13%] md:flex gap-32 text-white px-10">
        <div
          className={`basis-full border border-gray-500 flex justify-center items-center rounded-md hover:bg-orange-400 hover:scale-110 duration-200 cursor-pointer ${
            selectedReportOption === "datePicker" ? "bg-orange-400" : ""
          }`}
          onClick={() => {
            setSelectedReportOption("datePicker");
            setCount();
            setEnableCount(false);
            setAvgFromDate("");
            setAvgToDate("");
            setIntervalFromDate("");
            setIntervalToDate("");
            setAverageOption("hour");
          }}
        >
          <div className="">
            <BsCalendar2Date className="text-[300%] m-2" />
          </div>
          <div className="text-[17px] m-2">Date&nbsp;Picker</div>
        </div>

        <div
          className={`basis-full border border-gray-500 flex justify-center items-center rounded-md hover:bg-orange-400 hover:scale-110 duration-200 cursor-pointer ${
            selectedReportOption === "countWiseData" ? "bg-orange-400" : ""
          }`}
          onClick={() => {
            setSelectedReportOption("countWiseData");
            setFromDate("");
            setToDate("");
            setCount(100);
            setEnableCount(false);
            setAvgFromDate("");
            setAvgToDate("");
            setIntervalFromDate("");
            setIntervalToDate("");
            setAverageOption("hour");
          }}
        >
          <div className="">
            <PiClockCountdown className="text-[300%] m-2" />
          </div>
          <div className="text-[17px] m-2">Count</div>
        </div>

        <div
          className={`basis-full border border-gray-500 flex justify-center items-center rounded-md hover:bg-orange-400 hover:scale-110 duration-200 cursor-pointer ${
            selectedReportOption === "averageData" ? "bg-orange-400" : ""
          }`}
          onClick={() => {
            setSelectedReportOption("averageData");
            setFromDate("");
            setToDate("");
            setCount();
            setEnableCount(false);
            setIntervalFromDate("");
            setIntervalToDate("");
            setAverageOption("hour");
          }}
        >
          <div className="">
            <TbAlarmAverage className="text-[300%] m-2" />
          </div>
          <div className="text-[17px] m-2">Average</div>
        </div>

        <div
          className={`basis-full border border-gray-500 flex justify-center items-center rounded-md hover:bg-orange-400 hover:scale-110 duration-200 cursor-pointer ${
            selectedReportOption === "intervalData" ? "bg-orange-400" : ""
          }`}
          onClick={() => {
            setSelectedReportOption("intervalData");
            setFromDate("");
            setToDate("");
            setCount();
            setEnableCount(false);
            setAvgFromDate("");
            setAvgToDate("");
            setAverageOption("hour");
          }}
        >
          <div className="">
            <BsSkipForwardCircle className="text-[300%] m-2" />
          </div>
          <div className="text-[17px] m-2">Interval</div>
        </div>
      </div>

      {/* main content */}
      <div className="h-[71%] md:h-[85%] flex justify-center items-center text-gray-200">
        <div className="bg-gray-400/20 rounded-md px-10 py-4">
          {/* average option */}
          {selectedReportOption === "averageData" && (
            <form
              className="p-8 flex flex-col items-center justify-center gap-6"
              onSubmit={generateAverageExcel}
            >
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
                  <FaFileDownload className="text-lg" />
                  Download Excel
                </button>
              </div>
            </form>
          )}

          {/* interval option */}
          {selectedReportOption === "intervalData" && (
            <form
              className="flex flex-col gap-6 py-4 md:py-8 px-5 md:px-10 items-center justify-center"
              onSubmit={generateAverageExcel}
            >
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
                  <FaFileDownload className="text-lg" />
                  Download Excel
                </button>
              </div>
            </form>
          )}

          {/* datepicker option */}
          {selectedReportOption === "datePicker" && (
            <form
              className="p-4 md:p-8 flex flex-col items-center justify-center gap-6"
              onSubmit={generateExcel}
            >
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
                  <FaFileDownload className="text-lg" />
                  Download Excel
                </button>
              </div>
            </form>
          )}

          {/* countwise option */}
          {selectedReportOption === "countWiseData" && (
            <form
              className="flex flex-col gap-4 py-4 md:py-8 px-5 md:px-10 items-center justify-center"
              onSubmit={generateExcel}
            >
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
                  <FaFileDownload className="text-lg" />
                  Download Excel
                </button>
              </div>
            </form>
          )}
        </div>
        {loading && (
          <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center font-semibold text-sm">
            <div>Your report is being downloaded!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
