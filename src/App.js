import React, { useEffect } from 'react';
import { io } from "socket.io-client";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import Auth from './pages/Auth'; 
// import NotFound from './pages/NotFound';
// import Products from './pages/Products';

const App = () => {
  const { user } = useSelector((state) => state.user); 
  console.log(user?._id,"0000000000");
  
  
  useEffect(() => {
    if (user?._id) {
      
      const socket = io("http://localhost:5000"); // Replace with your backend's port
  
      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
  
        // Join the user's room based on their userId
        const userId = user._id;
        console.log(userId, "Joining room");
        socket.emit("join", userId);
      });
  
      socket.on("productUpdated", (data) => {
        console.log("Product updated:", data);
        alert(`Product ${data.productId} updated: ${JSON.stringify(data.changes)}`);
      });
  
      return () => {
        socket.disconnect(); // Clean up the socket connection
      };
    }
  }, [user]);
  

  return (
    <Router>
      <div className="min-h-screen  bg-gray-100">
        {user&&<Navbar />}
        <div className="container mx-auto  ">
          <Routes>
            <Route
              path="/"
              element={user ? (user.role === 'admin' ? <AdminHome /> : <UserHome />) : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Auth type="login" />} />
            <Route path="/signup" element={<Auth type="signup" />} />
            {/* <Route path="/products" element={<Products />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
