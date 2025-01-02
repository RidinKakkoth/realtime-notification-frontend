import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';

const Navbar = ({ notifications, onClearNotifications })  => {
  const { user } = useSelector((state) => state.user); // Get user data from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); // Log out the user by clearing the state
    navigate('/')

  };
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };
  console.log(notifications,"nnnnnnnnnn");
  

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">MyApp</Link>
        </div>


        <div className="space-x-4 flex items-center">

              {/* Notification Icon */}
              {user && (
            <div className="relative">
              {/* <button
                onClick={toggleNotifications}
                className="text-white relative"
              >
                <span className="material-icons">notifications</span>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                    {notifications.length}
                    
                    
                  </span>
                )}
              </button> */}

              <button onClick={toggleNotifications}
          className="relative p-2 rounded-full hover:bg-blue-700 focus:outline-none"
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.148-1.64-5.677-4.5-6.32M9 21h6M9 5.68C6.14 6.323 4.5 8.852 4.5 12v2.158c0 .538-.214 1.054-.595 1.437L3 17h5m6 0a3 3 0 11-6 0"
            />
          </svg>
          {notifications.length > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1">
           {notifications.length}
          </span>)}
        </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 z-10 mt-2 w-64 bg-white border shadow-lg">
                  <div className="p-2">
                    <h4 className="text-lg font-bold">Notifications</h4>
                    {notifications.length > 0 ? (
                      notifications.map((notif, index) => (
                        <div key={index} className="p-2 border-b">
                          <p>{notif.message}</p>
                          <small className="text-gray-500">{notif.time}</small>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No new notifications</p>
                    )}
                  </div>
                  <button
                    onClick={onClearNotifications}
                    className="w-full bg-blue-500 text-white p-2"
                  >
                    Clear Notifications
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Common links for all users */}
          {/* <Link to="/products" className="text-white hover:text-blue-200">Products</Link> */}

          {/* Links for admin role */}
          {user?.role === 'admin' && (
            <>
            <h1 className='text-white font-medium'>Admin</h1>
              {/* <Link to="/admin/dashboard" className="text-white hover:text-blue-200">Admin Dashboard</Link> */}
              {/* <Link to="/admin/products" className="text-white hover:text-blue-200">Manage Products</Link> */}
            </>
          )}

          {/* Links for authenticated users */}
          {user ? (
            <>
              <Link to="/profile" className="text-white hover:text-blue-200">Profile</Link>
              <button
                onClick={handleLogout}
                className="text-white border p-2 rounded-md hover:text-blue-200"
              >
                Logout
              </button>
            </>
          ) : (
            // Links for unauthenticated users
            <>
              <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
              <Link to="/signup" className="text-white hover:text-blue-200">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
