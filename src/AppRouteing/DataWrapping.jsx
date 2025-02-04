import React, { createContext,useState,useEffect, useContext } from 'react'
import axios from "axios";

const AlldataContext = createContext();


export const AlldataProvider =({children})=>{
    const [Sensordata, setData] = useState([]);
    const [terminalOutput, setTerminalOutput] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchData = async () => {
        const limit = localStorage.getItem("Limit")
        try {
        const response = await axios.get(`${apiUrl}/backend/DataCollection?limit=${limit}`);
        setData(response.data);
    
        const Response_data = response?response.data:[]
        if(Response_data.error == "No Data Found"){
            setTerminalOutput((prev) => [
                ...prev,
                { text: `No data has been received in the last ${limit}.`, type: "Error" },
            ]);
        }else{
            setTerminalOutput((prev) => [
                ...prev,
                { text: "Data received successfully from the sensor.", type: "success" },
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