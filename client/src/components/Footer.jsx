import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-6">
        <div className="font-bold text-xl text-indigo-700 mb-2 md:mb-0">
          FikirBul
        </div>
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Ana Sayfa
          </Link>
          <Link
            to="/favorites"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Favorilerim
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            İletişim
          </Link>
        </nav>
        <div className="text-xs text-gray-400 mt-2 md:mt-0">
          &copy; {new Date().getFullYear()} FikirBul. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
