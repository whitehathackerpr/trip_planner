import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue text-white p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Links Section */}
                <div className="space-x-4">
                    {/* Link to homepage */}
                    <Link to="/" className="hover:text-gray">HOME</Link>
                    
                    {/* Link to results page */}
                    <Link to="/results" className="hover:text-gray">RESULTS</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
