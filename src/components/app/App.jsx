import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Enter from "../enter/enter";
import SimpleHotelCheck from "../simpleHotelCheck/simpleHotelCheck";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Enter/>}/>
        <Route path='/simpleHotelCheck' element={<SimpleHotelCheck/>}/>
      </Routes>
      
    </>
    );
};


export default App;
