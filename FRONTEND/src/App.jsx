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
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BuyerProtectedRoute from "./routes/ProtectedRoute.jsx";
import Marketplace from "./pages/buyer/Marketplace.jsx";
import CropDetails from "./pages/buyer/CropDetails.jsx";
import BuyerProfile from "./pages/buyer/BuyerProfile.jsx";
import AdminProtectedRoute from "./routes/AdminProtectedRoute.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminCrops from "./pages/admin/AdminCrops.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminFarmers from "./pages/admin/AdminFarmers.jsx";
// import PlaceOrder from "./pages/buyer/PlaceOrder.jsx";
import MyOrders from "./pages/buyer/MyOrder.jsx";
import FarmerOrders from "./pages/farmer/FarmerOrders.jsx";
import FarmerTransactions from "./pages/farmer/FarmerTransaction.jsx";

import ForgotPassword from "./component/ForgetPassword.jsx";
import ResetPassword from "./component/ResetPassword.jsx";
import About from "./component/About.jsx";


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
      <Route path="/farmers/edit-crop/:id" element={<EditCrop/>} ></Route>
      <Route path="/farmers/add-crop" element={<AddCrop/>} ></Route>
      <Route path="/farmers/transactions" element={<FarmerTransactions />} />


      <Route path="/buyers/dashboard" element={<BuyerProtectedRoute> <BuyerDashboard/> </BuyerProtectedRoute>} />
      <Route path="/buyers/marketplace" element={<BuyerProtectedRoute> <Marketplace/> </BuyerProtectedRoute>} />
      <Route path="/buyers/marketplace/:id" element={<BuyerProtectedRoute> <CropDetails /> </BuyerProtectedRoute>} />
      <Route path="/buyers/profile" element={<BuyerProtectedRoute><BuyerProfile /> </BuyerProtectedRoute>} />

      <Route path="/admin/dashboard" element={<AdminProtectedRoute> <AdminDashboard /> </AdminProtectedRoute>} />
      <Route path="/admin/users" element={<AdminProtectedRoute> <AdminUsers /> </AdminProtectedRoute>} />
      <Route path="/admin/crops" element={<AdminProtectedRoute> <AdminCrops/> </AdminProtectedRoute>} />
      <Route path="/admin/farmers" element={<AdminProtectedRoute>  <AdminFarmers /> </AdminProtectedRoute>}/>


      {/* <Route path="/buyers/order/:id" element={<PlaceOrder />} /> */}
      <Route path="/buyers/orders" element={<MyOrders />} />
      <Route path="/farmers/orders" element={<FarmerOrders />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />


      <Route path="/login" element={<Login />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/about" element={<About/>}></Route>
       <Route path="/chatbot" element={<ChatBot chatLang={chatLang} />}></Route>
    </Routes>
    </>
  );
}
