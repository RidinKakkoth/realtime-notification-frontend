import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.user); // Get user data from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout()); // Log out the user by clearing the state
    navigate('/')

  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">MyApp</Link>
        </div>

        <div className="space-x-4 flex items-center">
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
