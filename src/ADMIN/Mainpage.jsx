import axios from 'axios';
import React, { useState } from 'react'

const Mainpage = () => {
    const [activeStatus, setActive] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const apiUrl = process.env.REACT_APP_API_URL;

    const btnStatus = async (id) => {
        setActive(id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    //   console.log("Submitted Data:", formData);
    
    //   try {
    //     const response = await axios.post(`${apiUrl}/backend/signup`, {
    //       Name: formData.name,
    //       Username: formData.email,
    //       Password: formData.password,
    //       Role: formData.role,
    //     });
    
    //     console.log(response.data);
    //     window.alert("Credentials stored successfully");
    //   } catch (error) {
    //     console.error("Error sending data:", error.response ? error.response.data : error.message);
    //     window.alert("Failed to store credentials. Please try again.");
    //   }
    };
    
    return (
        <div className='h-full w-full flex items-center justify-center'>
        <div className='h-[80%] w-[90%] rounded-md md:flex'>
            <div className='border w-full md:w-1/2 h-1/2 md:h-full text-white flex items-center justify-center'>
                <div className='w-[80%] h-[60%] grid grid-cols-2 gap-3 justify-center items-center'>
                    <div className='border w-full rounded-lg cursor-pointer hover:bg-orange-400 flex items-center justify-center p-4' onClick={() => btnStatus(0)}>
                        Add User
                    </div>
                    <div className='border w-full rounded-lg cursor-pointer hover:bg-orange-400 flex items-center justify-center p-4' onClick={() => btnStatus(1)}>
                        List of User
                    </div>
                    <div className='border w-full rounded-lg cursor-pointer hover:bg-orange-400 flex items-center justify-center p-4' onClick={() => btnStatus(2)}>
                        Mail Queue
                    </div>
                    <div className='border w-full rounded-lg cursor-pointer hover:bg-orange-400 flex items-center justify-center p-4' onClick={() => btnStatus(3)}>
                        Report
                    </div>
                </div>
            </div>
            <div className='border w-full md:w-1/2 h-1/2 md:h-full text-white flex items-center justify-center p-6'>
                {activeStatus === 0 && (
                    <div className='w-full max-w-md'>
                        <h2 className='text-2xl font-bold text-center mb-4'>Add Login Credentials</h2>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                            <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} className='p-2 border rounded-md text-black' required />
                            <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} className='p-2 border rounded-md text-black' required />
                            <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} className='p-2 border rounded-md text-black' required />
                            <div className='flex gap-4'>
                                <label>
                                    <input type='radio' name='role' value='user' checked={formData.role === 'user'} onChange={handleChange} /> User
                                </label>
                                <label>
                                    <input type='radio' name='role' value='admin' checked={formData.role === 'admin'} onChange={handleChange} /> Admin
                                </label>
                            </div>
                            <button type='submit' className='p-2 bg-orange-400 rounded-md cursor-pointer'>Submit</button>
                        </form>
                    </div>
                )}
                {activeStatus === 1 && <div>Content for List of User</div>}
                {activeStatus === 2 && <div>Content for Mail Queue</div>}
                {activeStatus === 3 && <div>Content for Report</div>}
            </div>
        </div>
    </div>
    );
};

export default Mainpage;