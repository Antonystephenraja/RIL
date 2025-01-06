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
    <div className='md:h-full h-full w-full  md:w-[full] space-y-2 text-white'>
      <div className='h-[550px] md:h-[49%] md:flex gap-2'>
        <div className='h-[250px] md:h-[100%] w-full md:w-[50%] space-y-2'>
          <div className='h-[10%] md:h-[8.5%] 2xl:h-[10%] flex justify-end'>
            <div className=' border border-gray-400 flex justify-center'>
              last updated time:12.23.232 2323:
            </div>
          </div>
          <div className='h-full md:h-[88.5%] w-full space-y-2'>
            <div className='flex justify-around h-[40%] md:h-[48%] w-full gap-2'>
              <div className='border border-gray-400 w-[50%] rounded-md'>
                col1
              </div>
              <div className='border border-gray-400 w-[50%] rounded-md'>
                col1
              </div>
            </div>
            <div className='flex justify-around h-[40%] md:h-[48%] w-full gap-2'>
              <div className='border border-gray-400 w-[50%] rounded-md'>
                col1
              </div>
              <div className='border border-gray-400 w-[50%] rounded-md'>
                col1
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[300px] md:h-full md:w-[50%] border border-gray-400 '>
          2cols2
        </div>
      </div>
      <div className='h-[550px] md:h-[49%]  border'>
        cols2
      </div>
      
    </div>
  )
}




export default Home
