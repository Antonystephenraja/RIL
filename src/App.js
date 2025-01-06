import { BrowserRouter} from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react'


import Initial_Route from "./AppRouteing/Initial_Route";

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
 
  return (
    <>
      <BrowserRouter>
        <Initial_Route/>
      </BrowserRouter>
    </>
  );
}

export default App;
