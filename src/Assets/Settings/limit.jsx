import React, { useState } from "react";

const Limits = () => {
  const [sensorValues, setSensorValues] = useState({ sensor1: "", sensor2: "", sensor3: "" });
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleInputChange = (sensor, value) => {
    setSensorValues((prevValues) => ({
      ...prevValues,
      [sensor]: value,
    }));
  };

  const handleButtonClick = async(sensor) => {
    try{
      const response = await fetch(`${apiUrl}/backend/mailAlret`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({sensorid:sensor,Value:sensorValues[sensor]})
      })
      const response_Data = await response.json();
      window.alert(response_Data.message)
      setSensorValues((prevValues) => ({
        ...prevValues,
        [sensor]: "", // Reset only the clicked sensor's value
      }));
    }catch(error){
      console.log(error);
    }
  };


  return (
    <div className="flex flex-col items-center w-full gap-10 md:gap-10 2xl:gap-14">
      <p className="text-xl font-extrabold md:text-[15px] 2xl:[20px]">Set Limit</p>
      {["sensor1", "sensor2", "sensor3"].map((sensor, index) => (
        <div
          key={index}
          className="flex flex-col items-center w-full max-w-md gap-4 md:flex-row md:gap-20 md:max-w-none md:items-center md:justify-center"
        >
          <p className="text-xl font-extrabold md:text-[15px] 2xl:[20px] capitalize">{sensor.replace("sensor", "Sensor ")}</p>
          <input
            className="w-full max-w-xs p-2 text-black bg-gray-300 border-2 rounded-md md:w-80"
            type="number"
            value={sensorValues[sensor]}
            onChange={(e) => handleInputChange(sensor, e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleButtonClick(sensor)}
            className="text-white bg-orange-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm p-2.5 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center me-2 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Limits;
