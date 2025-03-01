import React from "react";
import logo from "/image/oyo-logo1.png";
import { Activity, CircleUser, Globe, Phone } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full flex  ">
      <div className="flex px-10 shadow-md justify-center items-center py-2 w-full  ">
        <div className="content-center ">
          <img className=" w-20" src={logo} alt="oyo-icon" />
        </div>
        <div className="flex   px-5 gap-4  justify-between items-center border-r ">
          <div className="flex justify-start border cursor-pointer rounded-md ">
            <input
              className="p-2 w-[300px]  rounded-l-md border-r-2 "
              placeholder="Koramangala"
              type="text"
            />
            <p className="p-2 border-r-2 justify-start  text-base font-semibold bg-white px-8 text-black">
              Thu, 31 Dec - Wed, 1
            </p>
            <p className="p-2  text-base  font-semibold border-gray-500 px-8 bg-white text-black">
              1 Room, 1 Guest
            </p>
            <p className="p-3    rounded-r-md bg-[#1AB64F] hover:bg-[#128036] text-[#FFFFFF] text-base font-bold  px-12">
              Search
            </p>
          </div>
          <div className="flex   gap-4  items-center">
            <div className="flex cursol-pointer">
              <Globe className="stroke-1 " />
              <p className="font-semibold">EN</p>
            </div>
            <div className="flex gap-4 items-center ">
              <Phone className="stroke-1 " />
              <div className="flex flex-col ">
                <p className="text-black font-medium">0124-6201611</p>
                <p className="text-xs text-gray-500"> Call us to Book now</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center px-4  gap-2">
          <CircleUser className="stroke-[1.5]" />
          <p className="font-semibold text-[#585858]">Login / Signup</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
