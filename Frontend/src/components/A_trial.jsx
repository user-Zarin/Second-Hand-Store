import React, { useState } from "react";

const A_trial = () => {
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="p-4 text-blue-900 font-semibold">
      <h2 className="text-xl mb-4">Filters</h2>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded mb-4"
      />
      <div className="mb-4">
        <h3 className="font-bold mb-2">Price</h3>
        <input type="range" min="0" max="1000" className="w-full" />
      </div>
      <div>
        <h3 className="font-bold mb-2">Condition</h3>
        <label className="block">
          <input type="radio" name="used" className="mr-2" /> New
        </label>
        <label className="block">
          <input type="radio" name="used" className="mr-2" /> Used
        </label>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Mobile: Toggle Button */}
      <div className="md:hidden p-4">
        <button className="text-2xl font-bold" onClick={() => setIsOpen(true)}>
          ☰
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-64 bg-gradient-to-r from-cyan-400 to-blue-400">
        <SidebarContent />
      </div>

      {/* Sidebar - Mobile Overlay */}
      {isOpen && (
        <div className="transition-transform duration-300 ease-in-out">
          <div
            className="fixed inset-0 bg-amber-200 bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-100">
        <h1 className="text-3xl font-bold text-center mb-4">Main Content</h1>
        <p className="text-center text-gray-700">
          Resize screen to see sidebar behavior.
        </p>
        {[...Array(20).keys()].map((_, index) => (
          <div key={index} className="p-4 bg-white shadow rounded mb-4">
            <h2 className="text-xl font-semibold">Item {index + 1}</h2>
            <p className="text-gray-600">This is a sample item description.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default A_trial;
