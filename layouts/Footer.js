import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 p-4 mt-8">
      <div className="container mx-auto text-center text-white">
        <p>&copy; {new Date().getFullYear()} Blog App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;