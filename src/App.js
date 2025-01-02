import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import Auth from './pages/Auth'; 
// import NotFound from './pages/NotFound';
// import Products from './pages/Products';

import { connectSocket, disconnectSocket } from "./socketService"; // Import WebSocket service
import { fetchProduct } from './api/adminEndpoints';
import { setAllProducts } from './slices/productSlice';

const App = () => {
  const { user } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const dispatch=useDispatch()

  const getProducts = async () => {
    try {
      const response = await fetchProduct();
      
      if (response.success) {
        // setProducts(response.products);
        dispatch(setAllProducts(response.products));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      connectSocket(user._id, (data) => {
        setNotifications((prev) => [
          ...prev,
          {
            message: `Product ${data?.changes?.name} updated`,
            time: new Date().toLocaleTimeString(),
          },
        ]);
        getProducts()

      });
    }

    return () => {
      disconnectSocket(); // Clean up WebSocket connection
    };
  }, [user]);
  const handleClearNotifications = () => {
    setNotifications([]);
  };

  

  return (
    <Router>
      <div className="min-h-screen  bg-gray-100">
        {user&&  <Navbar
            notifications={notifications}
            onClearNotifications={handleClearNotifications}
          />}
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
