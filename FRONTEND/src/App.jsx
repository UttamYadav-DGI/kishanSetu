// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home.jsx"
import Navbar from "./component/Navbar.jsx";
import Login from "./component/Login.jsx";
import Contact from "./component/Contact.jsx";
import ChatBot from "./component/ChatBot.jsx";
import { useState } from "react";
import Services from "./component/Services.jsx";
import ChatBotWrapper from "./component/ChatBotWrapper.jsx";
import Register from "./component/Register.jsx";
import FarmerDashboard from "./pages/farmer/FarmerDashBoard.jsx";
import EditCrop from "./pages/farmer/EditCrop.jsx";
import AddCrop from "./pages/farmer/AddCrop.jsx";
import FarmerProfile from "./pages/farmer/FarmerProfile.jsx";

export default function App() {
  const [chatLang, setChatLang] = useState("hi");
  return (
    <>
   <Navbar setChatLang={setChatLang}></Navbar>
   <ChatBotWrapper></ChatBotWrapper>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/farmers/dashboard" element={<FarmerDashboard/>}></Route>
      <Route path="/farmers/profile" element={<FarmerProfile/>}></Route>

      <Route path="/farmer/edit-crop/:id" element={<EditCrop/>} ></Route>
      <Route path="/farmer/add-crop/:id" element={<AddCrop/>} ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route path="/register" element={<Register/>}></Route>
       <Route path="/chatbot" element={<ChatBot chatLang={chatLang} />}></Route>
    </Routes>
    </>
  );
}
