
import { Route, Routes } from "react-router-dom";
import Login from "../Compoents/Login";
import Protected_Route from "./Protected_Route";
import Report from "../Compoents/Report";
import Home from "../Compoents/Home";


const Initial_Route = () => {
  return (
    <>
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="/" element={<Protected_Route/>}>
            
                <Route path="/" element={<Home/>}/>
                <Route path="/Report" element={<Report/>}/>

            </Route>
        </Routes>
    </>
  )
}

export default Initial_Route
