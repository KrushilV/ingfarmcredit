import React from 'react';
import { Link } from 'react-router-dom';
import { Plane as Plant, LineChart, FileText } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Plant className="h-8 w-8" />
            <span className="text-xl font-bold">FarmCredit</span>
          </Link>
          <div className="flex space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-green-200">
              <LineChart className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/evaluate" className="flex items-center space-x-1 hover:text-green-200">
              <Plant className="h-5 w-5" />
              <span>Evaluate</span>
            </Link>
            <Link to="/reports" className="flex items-center space-x-1 hover:text-green-200">
              <FileText className="h-5 w-5" />
              <span>Reports</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;