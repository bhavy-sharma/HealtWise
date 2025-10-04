"use client";
import React from "react";

const Header = () => {
return (
    <header className="bg-green-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
    <div className="text-2xl font-bold">Healthwise</div>


        <nav>
        <ul className="flex space-x-6">
        <li><a href="#" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">About</a></li>
        <li><a href="#" className="hover:underline">Services</a></li>
        <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
    </nav>

    <a
        href="#"
        className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
    >
        Login
    </a>
    </header>
);
};

export default Header;