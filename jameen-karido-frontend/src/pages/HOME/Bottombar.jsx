import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Bottombar = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="h-10 bg-slate-300 lg:px-20  w-full relative">
      <div className="flex items-center lg:justify-center lg:gap-12 h-full w-full  ">
        {[
          {
            cityName: "Bhilai",
            areas: [
              "Koramangala",
              "Mg Road",
              "Rajaji Nagar",
              "Indiranagar",
              "Jayanagar",
              "Madiwala",
              "Majestic",
              "Yesvantpur Railway Station",
              "Marathahalli",
              "Hsr Layout",
              "All of Bangalore",
            ],
          },

          {
            cityName: "Raipur",
            areas: [
              "Koramangala",
              "Mg Road",
              "Rajaji Nagar",
              "Indiranagar",
              "Jayanagar",
              "Madiwala",
              "Shankar nagar",
              "Yesvantpur Railway Station",
              "Marathahalli",
              "Hsr Layout",
              "All of Bangalore",
            ],
          },
          {
            cityName: "Durg",
            areas: [
              "Koramangala",
              "Malviya Chowk",
              "Rajaji Nagar",
              "Indira nagar",
              "Jayanagar",
              "Madiwala",
              "Shankar nagar",
              "Yesvantpur Railway Station",
              "Marathahalli",
              "Hsr Layout",
              "All of Bangalore",
            ],
          },

          {
            cityName: "Rajnandgaon",
            areas: [
              "Popular Localities",
              "Koramangala",
              "Imam Chowk",
              "Bus Stand",
              "Indiranagar",
              "Jayanagar",
              "Madiwala",
              "Shankar nagar",
              "Yesvantpur Railway Station",
              "Marathahalli",
              "Hsr Layout",
              "All of Bangalore",
            ],
          },
        ]?.map((item, idx) => (
          <div
            className={`flex gap-0 lg:relative  p-2 px-5 group items-center justify-center ${
              isHovered == item.cityName && " bg-gray-400 "
            } `}
            onMouseEnter={() => setIsHovered(item.cityName)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <p key={item + idx}>{item.cityName}</p>
            <ChevronDown
              className="mt-1 group-hover:rotate-180 duration-500 "
              size={20}
            />
            {
              <div
                className={` ${
                  isHovered == item.cityName
                    ? " h-[500px]  px-8 p-4 opacity-100 "
                    : "  opacity-0 h-0"
                }  flex items-start absolute justify-center flex-col  gap-5 overflow-hidden w-full lg:min-w-[400px] duration-500 border top-12 left-0 lg:left-0 bg-white text-black`}
              >
                {item.areas.map(
                  (item, idx) =>
                    idx < 11 && (
                      <span className=" hover:text-red-700">
                        {" "}
                        <Link to="/ads">{item}</Link>
                      </span>
                    )
                )}
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bottombar;
