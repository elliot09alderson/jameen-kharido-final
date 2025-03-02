import React, { useEffect, useState } from "react";
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
  Trash2,
  User,
  Wifi,
} from "lucide-react";
import empty from "/empty.png";
import AgentAdSlider from "./AgentAdSlider.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_FLAT_Ad,
  delete_HOME_Ad,
  delete_LAND_Ad,
  delete_SHOP_Ad,
  messageClear,
} from "../rtk/slices/adSlice.js";
import Swal from "sweetalert2";
import { agent_myads } from "../rtk/slices/agentSlice.js";

const AgentFlatAds = () => {
  const { loader, adsInfo, agentInfo, errorMessage, successMessage } =
    useSelector((slice) => slice.agent);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleNavigate = (type, slug) => {
    navigate("/ad/detail", {
      state: { type: type, slug: slug }, // Pass adsInfo.myFlatAds in `state`
    });
  };

  const amenitiesLogo = [
    { generator: <BatteryCharging /> },
    { wifi: <Wifi /> },
  ];

  return (
    <div className="flex flex-row px-24 pt-10  flex-wrap gap-12 items-center justify-start">
      {adsInfo.myFlatAds?.length > 0 ? (
        adsInfo.myFlatAds?.map((item, idx) => {
          return (
            <div className="flex flex-col relative">
              <div className="flex rounded items-center text-xs px-2 py-1 gap-1  bg-white absolute top-14 left-2 z-10">
                <User className="size-4" />
                <div className="flex">
                  <p className="font-medium">Company-</p>
                  <p className="text-black font-bold">Serviced</p>
                </div>
              </div>

              <div className="flex w-full gap-4 cursor-pointer select-none  py-12">
                <AgentAdSlider images={item?.images} />
                <div className="flex flex-col gap-12  w-full relative ">
                  <div>
                    <p className="text-xl font-bold">{item?.title}</p>
                    <p>{item?.location}· 1.4 km</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4 items-center">
                      <button className="bg-green-700 px-2 rounded text-white font-semibold">
                        4.1 *
                      </button>
                      <p className="text-xs ">(864 Ratings) . Very Good</p>
                    </div>
                    <div className="flex gap-6 text-sm">
                      {item?.amenities?.map((item, idx) => (
                        <div className="flex gap-1">
                          {amenitiesLogo[item]}
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex  justify-between">
                    <div className="flex flex-col ">
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-black">
                          {" "}
                          ₹{item?.price}
                        </p>
                        <p className="text-gray-500 line-through"> ₹3497</p>
                        <p className="text-sm text-orange-400 font-medium">
                          72% off
                        </p>
                      </div>
                      <div className="flex gap-4 items-center py-4">
                        <LandPlot size={30} />

                        <p className="text-lg text-gray-800 flex-col flex justify-center gap-2 lg:flex-row lg:items-center font-semibold mt-2">
                          {item?.area} Sq Ft{" "}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-amber-800">
                        ₹ {Math.round(item.price / item.area)}
                        {" per Square ft. "}
                      </span>
                    </div>
                    <div className="flex gap-4 items-center ">
                      <p
                        className="text-black font-bold border border-black px-5 py-2 "
                        onClick={() => handleNavigate(item.type, item.slug)}
                      >
                        View Details
                      </p>

                      {/* <p className="text-white font-bold text-base px-5 bg-[#1AB64F] py-2">
                        Book Now
                      </p> */}
                      <p
                        className="text-white font-bold text-base px-5 bg-red-600 py-2 flex gap-3 items-center"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure ?",
                            text: "This AD will be deleted",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire({
                                title: "Deleted",
                                text: "Ad Delted successfully.",
                                icon: "success",
                              });
                              if (item.type == "shop") {
                                dispatch(delete_SHOP_Ad({ id: item._id }));
                              } else if (item.type == "land") {
                                dispatch(delete_LAND_Ad({ id: item._id }));
                              } else if (item.type == "home") {
                                dispatch(delete_HOME_Ad({ id: item._id }));
                              } else {
                                dispatch(delete_FLAT_Ad({ id: item._id }));
                              }
                            }
                          });
                          console.log("item.type", item.type);
                        }}
                      >
                        <Trash2 />
                        Delete Ad
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 w-[130px] absolute text-red-500 text-xs font-medium  right-4">
                  <Flame className="pt-0 h-4 size-10 " />
                  <p>11 people booked this hotel in last 6 hours</p>
                </div>
              </div>
            </div>
          );
        })
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
  );
};

export default AgentFlatAds;
