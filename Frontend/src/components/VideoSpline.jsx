import React from 'react'

function VideoSpline() {

    const fadeUp = {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Spline */}
            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/assets/SplineVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Hacky overlay to hide watermark */}
            <div className="absolute bottom-4 right-3 w-36 h-12 bg-[#0c081c] z-10 rounded-2xl lg:bg-[#010140]"></div>
            <div className="absolute bottom-4 left-3 w-36 h-12 bg-[#0c081c] z-10 rounded-2xl lg:bg-[#010140]"></div>
            {/* Animated Overlayed Titles */}
            <div className="absolute inset-0 z-10 flex items-end md:items-center justify-center md:justify-start p-6 md:pl-20 md:pt-24 pb-10 md:pb-0">
                <motion.div
                    className="flex flex-col gap-y-3 text-center md:text-left"
                    initial="initial"
                    animate="animate"
                >
                    <motion.h2 {...fadeUp} className="monoton-regular text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold drop-shadow-lg">
                        From
                    </motion.h2>
                    <motion.h2 {...fadeUp} className="monoton-regular font-bold drop-shadow-lg text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
                        <span className="text-blue-600">C</span>
                        <span className="text-purple-400">u</span>
                        <span className="text-yellow-500">r</span>
                        <span className="text-red-500">i</span>
                        <span className="text-orange-400">o</span>
                        <span className="text-pink-500">u</span>
                        <span className="text-green-500">s</span>
                        <span className="text-orange-500">.</span>
                        <span className="text-white">.</span>
                        <span className="text-orange-500">.</span>
                    </motion.h2>
                    <motion.h2 {...fadeUp} className="monoton-regular text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold drop-shadow-lg">
                        to
                    </motion.h2>
                    <motion.h2 {...fadeUp} className="monoton-regular text-green-400 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold drop-shadow-lg">
                        Confident...
                    </motion.h2>
                </motion.div>
            </div>
        </div>

    )
}

export default VideoSpline;