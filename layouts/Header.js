import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Header = ({ user, handleLogout }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('token');
    setTimeout(() => {
      handleLogout();
      setIsLoggingOut(false);
      navigate('/');
    }, 1000);
  };

  return (
    <header className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Blog App</div>
        <nav>
          <ul className="flex">
            <li className="mx-2">
              <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            </li>
            <li className="mx-2">
              <Link to="/list-posts" className="text-white hover:text-gray-200">List Posts</Link>
            </li>
            {!user.isLoggedIn ? (
              <>
                <li className="mx-2">
                  <Link to="/register" className="text-white hover:text-gray-200">Register</Link>
                </li>
                <li className="mx-2">
                  <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="mx-2">
                  <Link to="/account" className="text-white hover:text-gray-200">Account</Link>
                </li>
                <li className="mx-2">
                  <Link to="/post-form" className="text-white hover:text-gray-200">Post Form</Link>
                </li>
                <li className="mx-2">
                  <button
                    onClick={handleLogoutClick}
                    className="text-white hover:text-gray-200 cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      {isLoggingOut && (
     <div className="absolute top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 flex items-center justify-center">

          <ClipLoader color="#ffffff" loading={isLoggingOut} size={50} />
        </div>
      )}
    </header>
  );
};

export default Header;