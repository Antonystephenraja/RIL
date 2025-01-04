import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Navbar from '../Compoents/Navbar';
const Protected_Route = () => {
    const token = localStorage.getItem('token')
    const isValidToken = () => {
        return token && token.length > 0; 
      };
    return isValidToken() ?(
    <> 
        <div className='h-[100vh] bg-black p-2'>
            <div className='h-[7%]'>
                <Navbar/>
            </div>
            <div className='h-[93%]'>
                <Outlet/>
            </div>
        </div>
    </> 
    ) : (
        <Navigate to={'/login'}/>
    );
}

export default Protected_Route
