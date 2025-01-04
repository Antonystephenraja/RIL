import { BrowserRouter} from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react'


import Initial_Route from "./AppRouteing/Initial_Route";

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(()=>{
        devicename()
        const data = setInterval(devicename,2000);
        return()=>{
            clearInterval(data)
        }
    },[])
  const devicename = async()=>{
    try{
      const response = await axios.get(`${apiUrl}/backend/devicelast_datas`);
    //   setDeviceNames(response.data);
      console.log(response)

    }catch(error){
      console.error("Error fetching data:",error);
    }
  }
  return (
    <>
      <BrowserRouter>
        <Initial_Route/>
      </BrowserRouter>
    </>
  );
}

export default App;
