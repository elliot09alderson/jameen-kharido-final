import React, { useEffect } from "react";
import empty from "/empty.png";
import { HiLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  get_approved_ads,
  get_approved_ads_for_home,
} from "../../rtk/slices/adSlice";
import { Building2, Grid2x2X, House, LandPlot, Store } from "lucide-react";

import shop from "/image/ads/shop.jpg";
import flat from "/image/ads/flat.jpg";

import home from "/image/ads/home.jpg";

import land from "/image/ads/land.jpg";
import { Link, useNavigate } from "react-router-dom";

const ApprovedAds = () => {
  const dispatch = useDispatch();
  const { ApprovedAds, loader, successMessage, errorMesssage } = useSelector(
    (slice) => slice.ad
  );

  useEffect(() => {
    dispatch(get_approved_ads_for_home());
  }, []);
  useEffect(() => {
    console.log(ApprovedAds);
  }, [ApprovedAds]);
  const navigate = useNavigate();

  const handleNavigate = (type, slug) => {
    navigate("/ad/detail", {
      state: { type: type, slug: slug }, // Pass data in `state`
    });
  };
  return (
    <div className="flex flex-row lg:px-24   flex-wrap gap-12 items-center justify-center lg:py-24 py-12">
      {ApprovedAds?.length > 0 ? (
        ApprovedAds?.map((item, idx) => {
          console.log(item);
          return (
            <div
              className="p-5 min-h-[250px] cursor-pointer shadow-md rounded-md bg-stone-100 flex items-start  flex-col   w-[350px]  h-fit"
              key={idx + item?.title}
              onClick={() => handleNavigate(item.type, item.slug)}
            >
              {item.thumbnail ? (
                <img
                  src={item?.thumbnail}
                  alt=""
                  className=" object-cover lg:w-96 w-full min-h-64 rounded-md"
                />
              ) : (
                <img
                  src={
                    item.type == "Shop"
                      ? shop
                      : item.type == "Home"
                      ? home
                      : item.type == "Flat"
                      ? flat
                      : land
                  }
                  className="object-cover lg:w-96 w-full min-h-64"
                />
              )}
              <div className="flex flex-col  gap-2 pt-4">
                {/* <b className="text-lg">₹ {item.price}</b> */}

                <div className="flex items-center gap-2">
                  {item.type == "Shop" && <Store />}
                  {item.type == "Land" && <Grid2x2X />}

                  {item.type == "Flat" && <Building2 />}
                  {item.type == "Home" && <House />}

                  <h1>{item.title}</h1>
                </div>
                <b className="text-lg">
                  ₹ {Math.round(item.price / item.area)} per sq.ft
                </b>

                <h2 className="  text-base lg:text-sm pl-0  flex gap-2 items-center ">
                  <LandPlot className="size-5 " />
                  {item.area} sq.ft
                </h2>
                <p className=" text-sm lg:text-sm pl-0  flex gap-1 items-center ">
                  <HiLocationMarker className="size-5 " /> {item.location}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className=" min-h-[40vh] flex items-center justify-center w-full">
          <img
            src={empty}
            className=" w-96 lg:w-[400px] object-cover "
            alt="not found img"
          />
        </div>
      )}
    </div>
  );
};

export default ApprovedAds;
