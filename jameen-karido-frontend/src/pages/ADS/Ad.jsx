import {
  BatteryCharging,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  CircleChevronLeft,
  CircleChevronRight,
  Flame,
  LandPlot,
  ToggleLeft,
  ToggleRight,
  User,
  Wifi,
} from "lucide-react";
import empty from "/empty.png";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetch_Ad_by_category } from "../../rtk/slices/adSlice";
const Ad = () => {
  const { catname } = useParams();
  const dispatch = useDispatch();
  const { ApprovedAds } = useSelector((slice) => slice.ad);

  useEffect(() => {
    dispatch(fetch_Ad_by_category({ catname }));
  }, [catname]);
  
  useEffect(() => {
    console.log(ApprovedAds);
  }, [ApprovedAds]);

  const [location, setlocation] = useState({ latitude: "", longitude: "" });
  const [error, setError] = useState("");
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setlocation({ ...location, latitude: position.coords.latitude });
          setlocation({ ...location, longitude: position.coords.longitude });
        },
        (err) => {
          // Handle error
          setError("Error fetching location: " + err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Call getLocation function when component is mounted
    getLocation();
  }, []);
  const checkboxData = [
    {
      checked: false,
      title: "Family oyos",
    },

    {
      checked: false,
      title: "For Group Travellers",
    },

    {
      checked: false,
      title: "Local IDs accepted",
    },

    {
      checked: false,
      title: "oyos Welcomes couples",
    },

    {
      checked: false,
      title: "Internation Guests",
    },

    {
      checked: false,
      title: "Business travellers",
    },

    {
      checked: false,
      title: "oyo Recommended",
    },
  ];

  const [view, setview] = useState(false);

  const [collection, setcollection] = useState(5);

  function AdCard({ data }) {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const handleNavigate = (type, slug) => {
      navigate("/ad/detail", {
        state: { type: type, slug: slug }, // Pass data in `state`
      });
    };
    const amenitiesLogo = [
      { generator: <BatteryCharging /> },
      { wifi: <Wifi /> },
    ];

    return (
      <div>
        <div className="flex flex-col relative">
          <div className="flex rounded items-center text-xs px-2 py-1 gap-1  bg-white absolute top-14 left-2 z-10">
            <User className="size-4" />
            <div className="flex">
              <p className="font-medium">Company-</p>
              <p className="text-black font-bold">Serviced</p>
            </div>
          </div>

          <div className="flex w-full gap-4 cursor-pointer select-none  py-12">
            <div className="w-[800px] flex  ">
              {!view ? (
                <div className="relative text-white group ">
                  <div
                    className="hidden group-hover:block  bg-[rgb(0,0,0,0.32)] absolute rounded-full  left-4 top-52 p-4"
                    onClick={() => {
                      data?.images?.length > index &&
                        index > 0 &&
                        setIndex(index - 1);
                    }}
                  >
                    <ChevronLeft size={20} />
                  </div>

                  {data?.images?.length > 0 && (
                    <img
                      src={data?.images[index]}
                      className="duration-700 object-cover lg:w-[400px] lg:h-[400px]"
                    />
                  )}
                  <div
                    className="  hidden group-hover:block bg-[rgb(0,0,0,0.32)] absolute rounded-full  right-4 top-52  p-4"
                    onClick={() => {
                      if (index == data.images.length - 1) {
                        setIndex(0);
                      }
                      data?.images.length - 1 > index && setIndex(index + 1);
                    }}
                  >
                    <ChevronRight size={20} className=" " />
                  </div>
                </div>
              ) : (
                <div className="relative text-white group w-[250px]">
                  <div className="hidden group-hover:block  bg-[rgb(0,0,0,0.32)] absolute rounded-full  left-4 top-20 p-4">
                    <ChevronLeft
                      size={20}
                      onClick={() =>
                        data?.images.length > index &&
                        index > 0 &&
                        setIndex(index - 1)
                      }
                    />
                  </div>

                  <img src={data?.images[index]} className="duration-700 " />
                  <div className="  hidden group-hover:block bg-[rgb(0,0,0,0.32)] absolute rounded-full  right-4 top-20 p-4">
                    <ChevronRight
                      size={20}
                      className=" "
                      onClick={() =>
                        data?.images.length - 1 > index && setIndex(index + 1)
                      }
                    />
                  </div>
                </div>
              )}
              {!view ? (
                <div className="flex flex-col w-1/5  ">
                  {data?.images?.map((item, idx) => (
                    <img
                      className=" h-1/4  mx-1 pb-1"
                      src={item}
                      alt="room"
                      onClick={() => setIndex(idx)}
                    />
                  ))}
                </div>
              ) : (
                " "
              )}
            </div>
            <div className="flex flex-col gap-12  w-full relative ">
              <div>
                <p className="text-xl font-bold">{data?.title}</p>
                <p>{data?.location}· 1.4 km</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                  <button className="bg-green-700 px-2 rounded text-white font-semibold">
                    4.1 *
                  </button>
                  <p className="text-xs ">(864 Ratings) . Very Good</p>
                </div>
                {!view ? (
                  <div className="flex gap-6 text-sm">
                    {data?.amenities?.map((item, idx) => (
                      <div className="flex gap-1">
                        {amenitiesLogo[item]}
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  " "
                )}
              </div>
              <div className="flex  justify-between">
                <div className="flex flex-col ">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-black">
                      {" "}
                      ₹{data.price}
                    </p>
                    <p className="text-gray-500 line-through"> ₹3497</p>
                    <p className="text-sm text-orange-400 font-medium">
                      72% off
                    </p>
                  </div>
                  <div className="flex gap-4 items-center py-4">
                    <LandPlot size={30} />

                    <p className="text-lg text-gray-800 flex-col flex justify-center gap-2 lg:flex-row lg:items-center font-semibold mt-2">
                      {data.area} Sq Ft{" "}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-amber-800">
                    ₹ {Math.round(data.price / data.area)}
                    {"per Square ft. "}
                  </span>
                </div>
                {!view ? (
                  <div className="flex gap-4 items-center ">
                    <p
                      className="text-black font-bold border border-black px-5 py-2 "
                      onClick={() => handleNavigate(catname, data.slug)}
                    >
                      View Details
                    </p>

                    <p className="text-white font-bold text-base px-5 bg-[#1AB64F] py-2">
                      Book Now
                    </p>
                  </div>
                ) : (
                  " "
                )}
              </div>
            </div>
            {!view ? (
              <div className="flex gap-1 w-[130px] absolute text-red-500 text-xs font-medium  right-4">
                <Flame className="pt-0 h-4 size-10 " />
                <p>11 people booked this hotel in last 6 hours</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex   h-screen ">
      <div className="left w-[25%] px-8 overflow-y-scroll border-r scr">
        <div className="flex justify-between items-center  pt-10">
          <div className="flex flex-col  ">
            <p className="text-3xl font-bold">Filters</p>
            <p className="text-base font-medium text-black"> Price</p>
          </div>
          <div className="text-red-600 flex  ">
            <p className="text-sm font-bold">Clear All </p>
          </div>
        </div>
        <div className="border-b py-4">
          <input className="w-56  webkit" type="range" name="" id="" />
        </div>
        <div className="flex flex-col py-6 border-b">
          <p className="text-base font-bold pb-4">Collections</p>
          <div className="cursor-pointer gap-2 flex flex-col  ">
            {checkboxData
              .filter((item, idx) => idx < collection)
              .map((item, idx) => {
                return (
                  <div className="flex items-center text-[#313131] gap-4 cursor-pointer ">
                    <input
                      className="size-4 hover:bg-lime-500 cursor-pointer"
                      type="checkbox"
                      checked={item.checked}
                    />
                    <p className="">{item.title}</p>
                  </div>
                );
              })}
            <div className="flex pt-4">
              {collection == 5 ? (
                <p
                  className="text-red-500 font-bold text-sm"
                  onClick={() => setcollection(checkboxData.length)}
                >
                  + View More
                </p>
              ) : (
                <p
                  className="text-red-500 font-bold text-sm"
                  onClick={() => setcollection(5)}
                >
                  - View Less
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="right w-[75%] px-8 relative  overflow-y-scroll ">
        <div className="flex flex-col   py-4 border-b ">
          <div>
            <p className="text-xs text-blue-400">
              india bangalore Hotels koramangala Hotels
            </p>
          </div>
          <div className="flex justify-between   ">
            <div className="flex justify-center  items-center">
              <p className="text-xl font-bold">
                Hotels in Koramangala, Bangalore (124 oyos)
              </p>
            </div>
            <div className="flex justify-between w-1/2   ">
              <div className="flex items-center  pl-20  ">
                <p>Map View</p>
                {view ? (
                  <ToggleRight
                    className="rounded-full w-[100px] text-blue-400  overflow-hidden h-[50px] b-red-600"
                    onClick={() => setview(!view)}
                  />
                ) : (
                  <ToggleLeft
                    className="rounded-full text-blue-400 w-[100px] h-[50px]"
                    onClick={() => setview(!view)}
                  />
                )}
              </div>
              <div className="items-center flex gap-3 ">
                <p>Sort By</p>
                <div className="border border-gray-400 px-2">
                  <select className="p-2" name="text" id="">
                    <option value="">Popularity</option>
                    <option value="">Guest Rating</option>
                    <option value="">price Low to High</option>
                    <option value="">Serviced</option>
                    <option value="">Serviced</option>
                    <option value="">Serviced</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[600px]">
          <div className={` ${!view ? "w-full" : "w-2/4 overflow-y-scroll"} `}>
            {ApprovedAds.length > 0 ? (
              ApprovedAds.map((item, idx) => (
                <AdCard data={item} key={idx + "card"} />
              ))
            ) : (
              <div>
                <img
                  src={empty}
                  className=" w-64 lg:w-[400px] p-4"
                  alt="not found img"
                />
              </div>
            )}
          </div>

          {view && (
            <div className="flex justify-center items-start p-4">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d92263.37885920503!2d${location.latitude}!3d${location.longitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1736407815231!5m2!1sen!2sin`}
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ad;
