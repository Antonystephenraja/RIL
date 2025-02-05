import React, { createContext,useState,useEffect, useContext } from 'react'
import axios from "axios";

const AlldataContext = createContext();

export const AlldataProvider =({children})=>{
    const [Sensordata, setData] = useState([]);
    const [terminalOutput, setTerminalOutput] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;
    let count = 0;
    const fetchData = async () => {
        const limit = localStorage.getItem("Limit")
        try {
            const response = await axios.get(`${apiUrl}/backend/DataCollection?limit=${limit}`);
            setData(response.data);
            const Response_data = response?response.data:[]
            const Sensor_status = Response_data.terminal_status;
            const sensor_last_Data = Response_data.value;
            console.log(sensor_last_Data)
            if(!Sensor_status && count == 0){
                setTerminalOutput((prev) => [
                    ...prev,
                    { text: `No data has been received from the Sensor.`, type: "Error" },
                ]);
                count = 1;
            }else if(Sensor_status){
                setTerminalOutput((prev) => [
                    ...prev,
                    { text: `Temperature received at ${sensor_last_Data.Time} - S1:${sensor_last_Data.Sensor1}, S2:${sensor_last_Data.Sensor2}, S3:${sensor_last_Data.Sensor3}`, type: "success" },
                ]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setTerminalOutput((prev) => [
            ...prev,
            { text: "Error fetching data from the sensor.", type: "error" },
          ]);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
        fetchData(); 
        const interval = setInterval(fetchData, 3000); 
        return () => {
            clearInterval(interval)
        }
        };
    }, []);

    return(
        <AlldataContext.Provider value={{Sensordata,setData,terminalOutput, setTerminalOutput }}>
            {children}
        </AlldataContext.Provider>
    );
};


export const useAlldata=()=>useContext(AlldataContext);