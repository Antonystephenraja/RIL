import React ,{useState} from 'react';
import bgImage from '../Assets/bg.png';
import Xyma_white_bg from '../Assets/xyma.png';
import Utmaps from './../Modeling/Utmaps';
import { useNavigate } from "react-router-dom";


const Login = () => {
const [Username, setUsername] = useState("");
 const [Password, setPassword] = useState("");
 const navigate = useNavigate();
 const handleLoginFormSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("https://ril.xyma.live/backend/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username, Password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("Limit", 100); 
      localStorage.setItem("Limit", "1hr");
      navigate('/');
    } else {
      alert(data);
    }
  } catch (error) {
    console.log(error);
  }
 }

  return (
    <div
      className="h-[100vh] bg-cover bg-center flex justify-center items-center font-serif text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="border border-gray-500 w-[90%] h-[90%] md:w-[70%] md:h-[70%] grid md:grid-cols-2 rounded-md">
        {/* Left Section */}
        <div className="border-r  border-gray-400 bg-gray-400 bg-opacity-20 flex justify-center items-center">
          <div className='h-[90%]'>
            <span className="text-xl font-semibold "><Utmaps/></span>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-gray-400 bg-opacity-20 flex flex-col justify-center items-center space-y-6 px-6">
          {/* Logo */}
          <div className="flex justify-center h-[17%]">
            <img src={Xyma_white_bg} alt="Logo" className="w-[40%]" />
          </div>

          {/* Form */}
          <div className="flex flex-col items-center w-full space-y-6">
            {/* UserId Field */}
            <div className="flex flex-col w-[70%]">
              <label htmlFor="userId" className="text-sm font-medium mb-2">
                User ID:
              </label>
              <input
                id="userId"
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10 px-4 rounded-md border border-gray-500 bg-gray-300 bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col w-[70%]">
              <label htmlFor="password" className="text-sm font-medium mb-2">
                Password:
              </label>
              <input
                id="password"
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 px-4 rounded-md border border-gray-500 bg-gray-300 bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Verify Button */}
            <div className="w-[50%]">
              <button className="w-full h-10 border border-gray-500 rounded-md bg-[#a423cf] bg-opacity-60 hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleLoginFormSubmit}>
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
