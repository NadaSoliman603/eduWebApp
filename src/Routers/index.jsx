import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddQuestion from "../pages/AddQuestion";
import QuestionList from "../pages/QuestionList";



const AppRouts = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddQuestion />} />

        <Route path="/quiz" element={<QuestionList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouts;
