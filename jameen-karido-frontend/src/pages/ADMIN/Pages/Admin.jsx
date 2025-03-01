import React, { useEffect } from "react";
import Navbar from "../../HOME/Navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  admin_detail,
  admin_getAll_agents,
} from "../../../rtk/slices/adminSlice.js";
import moment from "moment";
import { Link } from "react-router-dom";
import user from "/image/user.webp";

const Admin = () => {
  const dispatch = useDispatch();
  const { loader, AdminInfo, AgentInfo, AdInfo, errorMessage, successMessage } =
    useSelector((state) => state.admin);

  useEffect(() => {
 
    dispatch(admin_detail());
  }, [dispatch]);

  console.log(AgentInfo, AdminInfo);
  return (
    <div className="w-full h-screen">
      <div className=" flex flex-col">
        <Link to="/admin">profile</Link>
        <Link to="allAgent">All Agent</Link>
        <Link to="allBlockAgent">All Blocked Agent</Link>
      </div>

      <div className="">
        <div className="flex items-center  lg:flex-row flex-col p-12 gap-12">
          <div className="flex flex-col items-center  justify-center">
            <div className="flex items-center  lg:flex-row flex-col justify-center  ">
              {/* <!-- Avatar --> */}
              <img
                src={AdminInfo?.avatar ? AdminInfo?.avatar : user}
                alt="Agent Avatar"
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-gray-300"
              />

              <div className="flex-col justify-center lg:pl-8 border  pl-0 flex lg:items-start items-center ">
                <h2 className="text-3xl capitalize font-semibold text-gray-800">
                  {AdminInfo?.name}
                </h2>
                <p className="text-sm  text-gray-500">{AdminInfo?.role}</p>
              </div>
            </div>

            <div className="mt-4 gap-5 lg:gap-8  flex flex-col space-y-2 border lg:w-96  bg-slate-300 lg:p-20 p-8 pt-10 w-80 rounded-2xl">
              <p className="">
                <strong>Email :</strong> {AdminInfo?.email}
              </p>
              <p className="">
                <strong>Phone :</strong> {AdminInfo?.phoneNumber}
              </p>
              {/* <p className="">
                              <strong>Whatsapp :</strong> {adsInfo?.whatsappNumber}
                            </p> */}
              {/* <p className="">
                              <strong>Verified :</strong>{" "}
                              {adsInfo?.isVerified ? "Yes" : "No"}
                            </p> */}
              <p className="">
                <strong>Joined At :</strong>{" "}
                {moment(AdminInfo?.createdAt).fromNow()}
              </p>
            </div>
          </div>

          <div className="mt-4  gap-5  h-full flex flex-col lg:w-96  p-8 pt-10 w-80 space-y-2 border bg-slate-300 lg:p-20 rounded-2xl">
            {/* <p className="">
                            <strong>Home Ads :</strong> {adsInfo?.myHomeAds?.length}
                          </p>
                          <p className="">
                            <strong>Shop Ads :</strong> {adsInfo?.myShopAds?.length}
                          </p>
                          <p className="">
                            <strong>Flat Ads :</strong> {adsInfo?.myFlatAds?.length}
                          </p>
                          <p className="">
                            <strong>Land Ads :</strong> {adsInfo?.myLandAds?.length}
                          </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
