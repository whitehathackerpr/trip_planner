import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center p-4 mt-4">
      <div className="text-gray-600">
        /**Quick links */
        <div>
          <h2 className="tetx-lg font-bold mb-3">Quick Links</h2>
          <ul>
            <li>
              <Link to='/' className='text-gray hover:text-white'>Home</Link>
            </li>
            <li>
              <Link to='/resluts' className='text-gray hover:text-white'>Results</Link>
            </li>
          </ul>
        </div>
        
        /**Copyright section */
        <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        &copy; 2025 Trip Planner. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
