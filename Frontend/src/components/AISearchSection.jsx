import React from "react";
import { ArrowRight } from "lucide-react";

function AISearchSection() {
  return (
    <div className="w-full bg-white text-center py-16 !px-0">
      <div className="max-w-[1440px] mx-auto w-full px-0 sm:px-6 lg:px-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
          <span>Still looking?</span> Try our{" "}
          <span className="text-black">AI Search</span>
        </h1>

        <p className="text-md sm:text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Just type who you are looking for. Be as specific as you want & see our AI do the magic.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-0">
          <input
            type="text"
            placeholder="I am looking for Software engineering leader for tech insights"
            className="flex-1 w-full px-5 py-3 rounded-full text-gray-800 placeholder-gray-400 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition">
            Search
            <ArrowRight className="ml-2" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AISearchSection;
