import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-[#a9b5df] shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Logo/Picture */}
        <div className="flex items-center">
          <img
            src="https://media.istockphoto.com/id/636379014/photo/hands-forming-a-heart-shape-with-sunset-silhouette.jpg?s=612x612&w=0&k=20&c=CgjWWGEasjgwia2VT7ufXa10azba2HXmUDe96wZG8F0=" // Path to your logo/picture
            alt="Logo"
            className="h-11 w-11  object-contain" // Adjust size and styling
          />
        </div>

        {/* Right Side - Headings */}
        <div className="flex space-x-6">
          {/* Home Heading */}
          <Link to="/dashboard" className="text-[#000000 text-lg font-medium">
            Home
          </Link>

          {/* User Heading */}
          <Link
            to="/dashboard/users"
            className="text-[#000000] text-lg font-medium"
          >
            Users
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
