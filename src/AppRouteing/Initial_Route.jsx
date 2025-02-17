import { Route, Routes } from "react-router-dom";
import Login from "../Compoents/Login";
import Protected_Route from "./Protected_Route";
import Report from "../Compoents/Report";
import Home from "../Compoents/Home";
import Analytics from "../Compoents/Analytics";
import Settings from "../Compoents/Settings";
import { AlldataProvider } from "./DataWrapping";
import Mainpage from "../ADMIN/Mainpage";

const Initial_Route = () => {
  return (
    <>
      <AlldataProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Protected_Route />}>
            <Route path="/" element={<Home />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/Analysis" element={<Analytics />} />
            <Route path="/Settings" element={<Mainpage />} />
            {/* <Route path="/Settings" element={<PdfReport/>} /> */}
          </Route>
        </Routes>
      </AlldataProvider>
    </>
  );
};

export default Initial_Route;
