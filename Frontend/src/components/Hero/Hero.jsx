import React from "react";

import video from "../../assets/video.mp4";

const Hero = () => {
  return (
    <>
      <div className="">
        <video
          className="top-0 left-0 w-full h-full object-cover transform scale-110"
          autoPlay
          muted
          loop
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex flex-col items-center top-2/4 text-white">
          <h1 className="text-3xl font-bold">
            Find Your Next Treasure And Discover Value in Every Visit
          </h1>
        </div>{" "}
      </div>
    </>
  );
};

export default Hero;
