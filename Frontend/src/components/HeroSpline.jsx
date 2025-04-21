import './spline.css';
import React from 'react';
import Spline from '@splinetool/react-spline';

function HeroSpline() {
  return (
    <div className="relative w-full h-screen">
      {/* Full-screen spline */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/osSVzf5mkGqzq8vF/scene.splinecode" />
      </div>

      {/* Overlayed text */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center md:justify-start md:pl-20 md:pt-24 p-6">
        <div className="absolute inset-0 z-10 flex items-end md:items-center justify-center md:justify-start p-4 md:pl-20 pb-10 md:pb-0">
          <div className="flex flex-col gap-y-3 text-center md:text-left">
            <h2 className="monoton-regular text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold drop-shadow-lg">
              From
            </h2>
            <h2 className="monoton-regular font-bold drop-shadow-lg text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
              <span className="text-blue-600">C</span>
              <span className="text-green-500">u</span>
              <span className="text-yellow-500">r</span>
              <span className="text-red-500">i</span>
              <span className="text-orange-400">o</span>
              <span className="text-pink-500">u</span>
              <span className="text-purple-400">s</span>
              <span className="text-orange-500">.</span>
              <span className="text-white">.</span>
              <span className="text-orange-500">.</span>
            </h2>
            <h2 className="monoton-regular text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold drop-shadow-lg">
              to
            </h2>
            <h2 className="monoton-regular text-green-400 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold drop-shadow-lg">
              Confident...
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSpline;
