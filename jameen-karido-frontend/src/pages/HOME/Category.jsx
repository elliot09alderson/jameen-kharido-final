import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import home from "/image/house.png";
import flat from "/image/residential.png";
import land from "/image/plot.png";
import shop from "/image/retailer.png";
const Category = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="h-auto py-6 bg-slate-300 lg:px-20  w-full">
      <div className="flex overflow-x-scroll lg:overflow-hidden items-center justify-evenly  lg:gap-12 h-full    px-2  ">
        {[
          {
            name: "Home",
            path: "home",
            image: home,
          },

          {
            name: "Shop",
            path: "shop",
            image: shop,
          },
          {
            name: "Land",
            path: "land",
            image: land,
          },

          {
            name: "Flat",
            path: "flat",
            image: flat,
          },
        ]?.map((item, idx) => (
          <div className="flex lg:flex-row flex-col  min-w-64 items-center lg:justify-between gap-8 lg:gap-0 ">
            <Link to={`ads/${item.path}`}>
              <div className="flex flex-col gap-4 items-center border cursor-pointer bg-fuchsia-950 px-14 py-10 rounded-md shadow-sm">
                <img src={item.image} className="lg:size-40 size-20 " alt="" />
                <p className="text-4xl font-semibold text-white">{item.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
