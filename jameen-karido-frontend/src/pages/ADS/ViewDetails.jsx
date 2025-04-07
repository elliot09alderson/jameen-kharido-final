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
import { Link, useLocation } from "react-router-dom";
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
  Verified,
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
  VerifiedIcon,
} from "lucide-react";
import whatsapp from "/whatsapp.png";
const ViewDetails = () => {
  const { adDetail } = useSelector((slice) => slice.ad);

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
  const { userInfo, successMessage, errorMessage, loader } = useSelector(
    (slice) => slice.auth
  );
  console.log(adDetail);
  const WhatsAppButton = (content) => {
    const phoneNumber = "+918770800807"; // Replace with your phone number
    const message =
      "hii i want to know more about this ad. can you please help me here is the id " +
      content; // Your default message

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };
  return (
    <div className="w-full flex flex-col ">
      <Navbar />
      <div className="flex cursor-pointer h-[750px] pb-6 overflow-y-scroll relative  lg:py-12 ">
        <Swiper
          // cssMode={true}
          // mousewheel={true}
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
              <div className="flex items-center gap-2">
                <p className="text-4xl  font-bold ">
                  {adDetail.title}
                  <br />
                </p>{" "}
                <VerifiedIcon className="size-6 border w-fit   items-center gap-1 bg-[#FFF6EE] text-[#F49242] font-semibold rounded-full flex" />
              </div>
              <p className="text-[#BFBFBF]">
                {adDetail.description}
                <br />
                {adDetail.location}
              </p>
              {/* <div className="flex flex-col  gap-4">
                <div className="flex border w-[90px] items-center justify-center py-1  bg-[#F5F5F5] gap-1">
                  <img className="w-[14px] h-[11px]" src={superoyo} alt="" />
                  <p className="text-xs font-medium ">Super oyo</p>
                </div>
                <div className="flex lg:pl-6 mb-2">
                  <p>5.0 · Check-in rating Delightful experience</p>
                </div>
              </div> */}
            </div>
            <div className="flex flex-col max-w-32  ">
              <div className="flex gap-1 bg-[#58AC00]  rounded-t-sm text-white px-2 py-1 justify-center items-center ">
                <p className="font-bold text-2xl"> 4.3 </p>
                <Star className="size-5" />
              </div>
              <div className="bg-[#F4F4F4] rounded-b-sm text-xs flex justify-center items-center    ">
                {/* <p>762 Ratings</p> */}
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
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold py-4">More About</p>
              <a href="" className="underline">
                {adDetail.slug}
              </a>
            </div>
            <div className="flex items-center gap-4 ">
              Locality Details
              <p className="text-gray-500 my-2"> {adDetail.nearby}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="flex items-center   ">
                <label className=""> Total Washrooms </label>
                <h2> {":    " + adDetail.bathrooms} </h2>
              </div>
              <div className="flex items-center   ">
                <label className=""> Total Bedrooms </label>
                <h2> {":    " + adDetail.bedrooms} </h2>
              </div>{" "}
              <div className="flex items-center   ">
                <label className=""> Floor</label>
                <h2> {":    " + adDetail.floor} </h2>
              </div>
              <div className="flex items-center   ">
                <label className=""> Furnished</label>
                <h2> {":    " + adDetail?.furnished} </h2>
              </div>
              {adDetail.parking && <h2>Parking Available</h2>}
              <div className="flex items-center   ">
                <label className=""> Pincode </label>
                <h2> {":    " + adDetail.pincode} </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[400px] w-full p  border  h-full rounded-md shadow-md  ">
          {!userInfo && (
            <div className="flex bg-red-500 items-center py-2 gap-3 px-4 justify-center rounded-t-md uppercase ">
              <p className="text-white text-xs font-bold">
                Login now to get contact details{" "}
              </p>
              <div className="flex border rounded-sm  bg-[#F58775] text-xs px-2 p-1">
                <Link to={"/login"}>
                  <p className="text-white font-bold">LOGIN</p>
                </Link>
              </div>
            </div>
          )}
          <div className="py-6 px-4 ">
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-2xl font-bold">₹{adDetail.price}</p>
              <div className="flex items-center justify-between flex-col">
                <VerifiedIcon className="size-6 border w-fit   items-center gap-1 bg-[#FFF6EE] text-[#F49242] font-semibold rounded-full flex" />
                <p className="text-xs pr-2 text-[#F49242]">verified</p>
              </div>
            </div>
            <div className="flex  gap-2 flex-col justify-center ">
              <div className="flex gap-2">
                <p className="text-[#6C787C] ">{adDetail.area}</p>
                <p className="text-[#F7B446] font-semibold text-sm">sq ft</p>
              </div>
              <p className="text-[#6C787C] text-xs">
                {" "}
                {Math.round(adDetail.price / adDetail.area)} per sq. ft
              </p>
            </div>
            <div className="">
              <div className="flex flex-col gap-4 py-4">
                <div className="flex justify-between items-center">
                  <p>Rupee Per square ft</p>
                  <p className="text-base font-semibold ">
                    {" "}
                    ₹{Math.round(adDetail.price / adDetail.area)}
                  </p>
                </div>
                <div className=" flex flex-col gap-1  ">
                  <div className="flex justify-between ">
                    <p>Total price</p>
                    <p className="text-base font-semibold">
                      ₹{adDetail.price + 2500}
                    </p>
                  </div>
                  <div className="flex  items-center gap-2 ">
                    <p className="text-xs text-[#898590]">
                      Including taxes & fees
                    </p>
                    <ShieldAlert className="size-3" />
                  </div>
                </div>
                <div className="bg-[#1AB64F] p-3 rounded-md text-center  mt-8">
                  {!userInfo ? (
                    <Link to={"/login"}>
                      <p className="text-white font-semibold text-lg cursor-pointer ">
                        Login to get Details
                      </p>
                    </Link>
                  ) : (
                    <p
                      className="text-white font-semibold flex items-center  justify-center text-lg cursor-pointer "
                      onClick={() => WhatsAppButton(adDetail.slug)}
                    >
                      <img src={whatsapp} className="w-16" alt="" />
                      Enquire now
                    </p>
                  )}
                </div>
              </div>
              {/* <div className="flex flex-col gap-4">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
