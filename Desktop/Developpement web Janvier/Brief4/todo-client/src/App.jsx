

import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import React from 'react';

function App() {
  

  return (
    <>
      
     <Router>
        <Routes>
          <Route path="/" element= {<RegisterForm />} /> 
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element= {<RegisterForm />} />
          <Route path="/dashboard" element={
               <PrivateRoute>
                 <Dashboard />
               </PrivateRoute>
             }
           />
          <Route path="*" element= {<RegisterForm />} />
        </Routes>
     </Router>
      
    </>
  )
}

export default App
