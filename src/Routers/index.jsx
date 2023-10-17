import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddQuestion from "../pages/AddQuestion";



const AppRouts = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddQuestion />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouts;
