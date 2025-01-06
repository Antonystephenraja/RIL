import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Navbar from '../Compoents/Navbar';
import bgImage from '../Assets/bg.png';

const Protected_Route = () => {
    const token = localStorage.getItem('token')
    const isValidToken = () => {
        return token && token.length > 0; 
      };
    return isValidToken() ?(
    <> 
        <div className='h-[1200px] md:h-[100vh] bg-cover bg-center p-2' style={{backgroundImage:`url(${bgImage})`}}>
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
