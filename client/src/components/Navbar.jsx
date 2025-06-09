import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow">
      <div className="font-bold text-xl text-indigo-700">FikirBul</div>
      <div className="flex gap-4">
        <Link
          to="/"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Ana Sayfa
        </Link>
        <Link
          to="/favorites"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Favorilerim
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          İletişim
        </Link>
      </div>
    </nav>
  );
}
