"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = ({ setopenTaskDialog }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white/30 backdrop-blur-lg border-b border-white/40 shadow-md fixed top-0 left-0 w-full z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-800">
              Task Manager
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </a>

\              <Button
                onClick={() => setopenTaskDialog(true)}
                className="w-28 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Add New Task
              </Button>
            

            <a
              href="/task"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              All Tasks
            </a>

            {/* Dropdown Menu for Task Status */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Task Status
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-md">
                  <a
                    href="/completed"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 transition-colors"
                  >
                    Completed Tasks
                  </a>
                  <a
                    href="/inprogress"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 transition-colors"
                  >
                    In Progress Tasks
                  </a>
                  <a
                    href="/pending"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 transition-colors"
                  >
                    Pending Tasks
                  </a>
                </div>
              )}
            </div>

            <a
              href="/calendar"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Calendar
            </a>

            {/* Notifications */}
            <button className="relative text-gray-600 hover:text-blue-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V4a2 2 0 10-4 0v1.083A6.002 6.002 0 004 11v3.159c0 .538-.214 1.054-.595 1.438L2 17h5m7 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <div className="md:hidden">
            <button
              className="text-gray-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/calendar"
            className="block text-gray-700 hover:text-blue-600 hover:bg-slate-800  transition-colors"
          >
            Calendar
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
