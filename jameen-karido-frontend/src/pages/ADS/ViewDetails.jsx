import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import bedroom from "/image/bedroom.jpg";

import superoyo from "/public/image/SuperOYO.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Mousewheel, Keyboard, FreeMode } from "swiper/modules";

import "swiper/css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_ad_detail } from "../../rtk/slices/adSlice";
import {
  AirVent,
  BatteryCharging,
  CarTaxiFront,
  Cctv,
  Check,
  CircleCheck,
  CreditCard,
  DoorClosed,
  Heart,
  Heater,
  Hotel,
  Images,
  MonitorStop,
  Pencil,
  Percent,
  QrCode,
  ShieldAlert,
  Star,
  Wifi,
  Tv,
} from "lucide-react";
const ViewDetails = () => {
  const { loader, adDetail, errorMessage, successMessage } = useSelector(
    (slice) => slice.ad
  );

  const amenitiesData = [
    { name: "inverter", label: "Inverter", Icon: BatteryCharging },
    { name: "tv", label: "TV", Icon: Tv },
    { name: "wifi", label: "Wifi", Icon: Wifi },
    { name: "decor", label: "Decor", Icon: Heart },

    { name: "visit", label: "Visit", Icon: CarTaxiFront },
    { name: "cctv", label: "CCTV", Icon: Cctv },
    { name: "ventillator", label: "Ventillator", Icon: AirVent },
  ];
  const [viewMore, setViewMore] = useState(false);
  const location = useLocation();
  const { type, slug } = location.state || {};
  const dispatch = useDispatch();
  if (!type || !slug) {
    return <p>No data provided</p>; // Fallback if state is missing
  }

  useEffect(() => {
    dispatch(get_ad_detail({ type, slug }));
  }, []);

  return (
    <div className="w-full flex flex-col ">
      <Navbar />
      <div className="flex cursor-pointer h-[550px] pb-6 overflow-y-scroll relative  lg:py-12 ">
        <Swiper
          // cssMode={true}
          mousewheel={true}
          keyboard={true}
          slidesPerView={1}
          spaceBetween={50}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          freeMode={true}
          modules={[Mousewheel, Keyboard, FreeMode]}
          className="mySwiper"
        >
          {adDetail.images?.map((item, idx) => (
            <SwiperSlide>
              <img src={item} alt="bedroom" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex cursor-pointer absolute p-2 bottom-6 bg-white px-2 py-1 gap-2 rounded-sm border-black border right-6 z-10">
          <Images />
          <p className="text-sm font-semibold text-[#3F3F3F]">
            View all photos
          </p>
        </div>
      </div>
      <div className="flex px-4 w-full justify-center lg:flex-row flex-col gap-7 lg:gap-16 pb-8 lg:py-8">
        <div className="lg:w-[700px]   w-full flex flex-col gap-2 ">
          <div className="flex flex-col lg:flex-row justify-between ">
            <div className="flex flex-col gap-2 ">
              <p className="text-4xl  font-bold ">
                {adDetail.title}
                <br />
              </p>
              <p className="text-[#BFBFBF]">
                {adDetail.description}
                <br />
                {adDetail.location}
              </p>
              <div className="flex flex-col  gap-4">
                <div className="flex border w-[90px] items-center justify-center py-1  bg-[#F5F5F5] gap-1">
                  <img className="w-[14px] h-[11px]" src={superoyo} alt="" />
                  <p className="text-xs font-medium ">Super oyo</p>
                </div>
                <div className="flex lg:pl-6 mb-2">
                  <p>5.0 · Check-in rating Delightful experience</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col max-w-32  ">
              <div className="flex gap-1 bg-[#58AC00]  rounded-t-sm text-white px-2 py-1 justify-center items-center ">
                <p className="font-bold text-2xl"> 4.3 </p>
                <Star className="size-5" />
              </div>
              <div className="bg-[#F4F4F4] rounded-b-sm text-xs flex justify-center items-center    ">
                <p>762 Ratings</p>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="border w-fit px-2 py-1 items-center gap-1 bg-[#FFF6EE] text-[#F49242] font-semibold rounded-md flex">
              <Heart className="size-3" />
              <p>{adDetail?.nearby}</p>
            </div>
          </div>
          <div className="flex ">
            <h1 className="font-bold text-2xl">Amenities</h1>
          </div>
          <div className="flex flex-wrap  items-center w-full  pl-2 justify-start select-none">
            {amenitiesData.map((item, idx) => {
              if (
                adDetail?.amenities?.includes(item.name) &&
                (viewMore || idx < 6)
              ) {
                return (
                  <div key={item.name} className="w-1/3 flex py-4 gap-2">
                    <item.Icon className="w-6 h-6 " />
                    {item.label}
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div>
            {viewMore ? (
              <p
                className="text-[#EE2E24]  lowercase  font-semibold underline text-sm "
                onClick={() => setViewMore(false)}
              >
                Show Less
              </p>
            ) : (
              <p
                className="text-[#EE2E24] lowercase  font-semibold underline text-sm lg:text-base cursor-pointer"
                onClick={() => setViewMore(true)}
              >
                Show More
              </p>
            )}
          </div>
          <div className="flex flex-col ">
            <p className="text-2xl font-bold py-4">About this oyo</p>
            <p className="">Affordable hotel at prime location.</p>
          </div>
        </div>
        <div className="lg:w-[400px] w-full p  border lg:h-[700px] h-full rounded-md shadow-md  ">
          <div className="flex bg-red-500 items-center py-2 gap-3 px-4 justify-center rounded-t-md uppercase ">
            <p className="text-white text-xs font-bold">
              Login now to get upto 15% lower prices{" "}
            </p>
            <div className="flex border rounded-sm  bg-[#F58775] text-xs px-2 p-1">
              <p className="text-white font-bold">LOGIN</p>
            </div>
          </div>
          <div className="py-6 px-4 ">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">₹1101</p>
              <p className="text-[#6C787C] ">₹4797</p>
              <p className="text-[#F7B446] font-semibold text-sm">77% off</p>
            </div>
            <div>
              <p className="text-[#6C787C] text-xs">+ taxes & fees: ₹242</p>
            </div>
            <div className="py-4">
              <div className="py-5">
                <div className="border  h-[50px] px-4 shadow-sm font-medium flex items-center justify-between rounded-sm">
                  <div className="gap-2 flex ">
                    <DoorClosed />
                    <p>Classic</p>
                  </div>
                  npm
                  <div className="f">
                    <Pencil className="size-4 text-red-500" />
                  </div>
                </div>
              </div>
              <div className="py-3 flex flex-col border-b pb-6">
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="rounded-full bg-[#F5A623] text-white size-4 " />
                    <p>WELCOME80 coupon applied</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <p className=" font-semibold text-black">-₹1640</p>
                    <Check className="rounded-sm size-4 bg-green-400 text-white" />
                  </div>
                </div>
                <div className="pl-6 pt-1">
                  <div className="border border-[#8EE0B6] w-fit rounded-sm font-semibold bg-[#EFFCF5] text-[#698e7f] text-xs  px-2 py-1">
                    <p>MORE OFFERS</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex justify-between items-center">
                  <p>Your savings</p>
                  <p className="text-base font-semibold ">₹1785</p>
                </div>
                <div className=" flex flex-col gap-1  ">
                  <div className="flex justify-between ">
                    <p>Total price</p>
                    <p className="text-base font-semibold">₹1190</p>
                  </div>
                  <div className="flex  items-center gap-2 ">
                    <p className="text-xs text-[#898590]">
                      Including taxes & fees
                    </p>
                    <ShieldAlert className="size-3" />
                  </div>
                </div>
                <div className="bg-[#1AB64F] p-3 rounded-md text-center">
                  <p className="text-white font-semibold text-lg ">
                    Continue to Book
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className=" text-[#EF2E2B]">
                  <p>9 people booked this hotel in last 6 hours</p>
                </div>
                <div className="flex flex-col gap-2 text-[#EF2E2B]">
                  <div className="flex gap-1 items-center  ">
                    <p>Cancellation Policy</p>
                    <ShieldAlert className="size-3" />
                  </div>
                  <div className="">
                    <p>Follow safety measures advised at the hotel</p>
                  </div>
                  <div className="flex  gap-2 items-center">
                    <p className="text-[#9E9E9E] text-sm">
                      By proceeding, you agree to our
                    </p>
                    <p className="">Guest Policies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
