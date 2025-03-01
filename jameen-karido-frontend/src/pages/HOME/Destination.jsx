import React from "react";
import map from "/image/map.jpg";

const Destination = () => {
  return (
    <div className="flex w-full bg-[#F3F5F7]">
      <div className="flex lg:gap-14 lg:pb-8 flex-col lg:flex-row px-4">
        <div className=" flex lg:py-12 pl-4   ">
          <img className="lg:w-[700px] w-96" src={map} alt="" />
        </div>
        <div className="flex flex-col gap-2 lg:gap-6  lg:pt-20 ">
          <h1 className="text-xl lg:text-3xl font-bold text-[#333333]">
            There's an oyo around Always.
          </h1>
          <p className="text-[#48494A] lg:text-lg">
            More Destinations. More Ease. More Affordable.
          </p>
          <div className="flex gap-10 lg:gap-14 py-2 ">
            <div className="flex flex-col items-center">
              <p className="lg:text-4xl font-semibold text-[#333333]">35+</p>
              <p className="text-base text-gray-500">Countries</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="lg:text-4xl font-semibold text-[#333333]">
                174,000+
              </p>
              <p className="text-base text-gray-500">Hotels & Homes</p>
            </div>
          </div>
          <div className="flex lg:gap-12 py-4 gap-3 lg:py-8 pt-4 flex-wrap  w-full">
            <div className="flex gap-4 items-center w-1/4 lg:w-1/6">
              <p className="size-2 rounded-full  bg-green-500 items-center"></p>
              <p className="te[#1F2020] font-medium text-gray-500 ">
                Indonesia
              </p>
            </div>
            <div className="flex gap-4 items-center w-1/4 lg:w-1/6">
              <p className="size-2 rounded-full  bg-[#5FD6F2] items-center"></p>
              <p className="text-[#1F2020] font-medium text-base ">US</p>
            </div>

            <div className="flex gap-4 items-center w-1/4 lg:w-1/6">
              <p className="size-2 rounded-full  bg-[#FF7F7B] items-center"></p>
              <p className="text-[#1F2020] font-medium text-base ">Malaysia</p>
            </div>
            <div className="flex gap-4 items-center w-1/4 lg:w-1/6">
              <p className="size-2 rounded-full  bg-[#FE94F1] items-center"></p>
              <p className="text-[#1F2020] font-medium text-base ">Uk</p>
            </div>

            <div className="flex gap-4 items-center w-1/4 lg:w-1/6">
              <p className="size-2 rounded-full  bg-[#F5A623] items-center"></p>
              <p className="text-[#1F2020] font-medium text-base ">Denmark</p>
            </div>
            <div className="flex gap-4 items-center w-1/4 lg:w-1/6">
              <p className="size-2 rounded-full  bg-[#7E89E4] items-center"></p>
              <p className="text-[#1F2020] font-medium text-base ">
                Netherlands
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
