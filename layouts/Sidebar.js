import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-600 text-white w-64 min-h-screen shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Sidebar</h2>
        <ul className="space-y-4">
          <li>
            <NavLink 
              to="/recent-posts" 
              className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300" 
              activeClassName="bg-blue-600"
            >
              Recent Posts
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/categories" 
              className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300" 
              activeClassName="bg-blue-600"
            >
              Categories
            </NavLink>
          </li>
          {/* Add more navigation links or widgets here */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;