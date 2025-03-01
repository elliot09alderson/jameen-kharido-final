import { Airplay, House } from "lucide-react";
import React from "react";
import flat from "/image/flat1.png";
import home from "/image/homeback.png";
import house from "/image/house.png";
import home1 from "/image/residential.png";
import landmark from "/image/plot.png";
import shop1 from "/image/retailer.png";
import shop from "/image/shop.png";
import { Link } from "react-router-dom";
const POST = () => {
  return (
    <div className="w-full">
      <div className="flex  min-h-screen lg:px-40  px-4 py-12  lg:flex-row flex-col items-center lg:justify-between gap-8 lg:gap-0 ">
        {[
          { path: "home", name: "HOME", img: house },
          { path: "flat", name: "flat", img: home1 },
          { path: "land", name: "land", img: landmark },
          { path: "shop", name: "shop", img: shop },
        ].map((item, idx) => (
          <Link to={item.path} key={idx + item.name} className="p-4">
            <div className="flex flex-col gap-4 items-center border cursor-pointer bg-fuchsia-950 px-14 py-10 rounded-md shadow-sm">
              <img src={item.img} className="lg:size-40 size-20 " alt="" />
              <p className="text-4xl font-semibold text-white">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default POST;
