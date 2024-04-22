import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/quiz" element={<QuizPage/>}></Route>    
      </Routes>
    </BrowserRouter>
  )
}

export default Router