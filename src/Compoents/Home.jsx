import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [de,setDeviceNames]=useState('')
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
        //   console.log(response)

        }catch(error){
          console.error("Error fetching data:",error);
        }
      }

  return (
    <div className='h-[100%] border'>
      Home
    </div>
  )
}

export default Home
