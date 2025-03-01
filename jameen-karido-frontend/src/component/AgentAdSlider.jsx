import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const AgentAdSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="lg:w-[800px]  w-full flex   ">
      <div className="relative text-white group ">
        <div
          className="hidden group-hover:block  bg-[rgb(0,0,0,0.32)] absolute rounded-full  left-4 top-52 p-4"
          onClick={() => {
            images?.length > index && index > 0 && setIndex(index - 1);
          }}
        >
          <ChevronLeft size={20} />
        </div>

        {images?.length > 0 && (
          <img
            src={images[index]}
            className="duration-700 object-cover w-[300px] h-[200px]  lg:w-[400px] lg:h-[400px]"
          />
        )}
        <div
          className="  hidden group-hover:block bg-[rgb(0,0,0,0.32)] absolute rounded-full  right-4 top-52  p-4"
          onClick={() => {
            if (index == images.length - 1) {
              setIndex(0);
            }
            images.length - 1 > index && setIndex(index + 1);
          }}
        >
          <ChevronRight size={20} className=" " />
        </div>
      </div>

      <div className="flex flex-col lg:w-1/5 w-1/6   ">
        {images?.map((img, idx) => (
          <img
            className=" h-1/4  mx-1 pb-1"
            src={img}
            alt="room"
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentAdSlider;
