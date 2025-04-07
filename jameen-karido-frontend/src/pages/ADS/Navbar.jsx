import React from "react";
import logo from "/1.png";
import { Activity, CircleUser, Globe, Phone } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import user from "/image/user.webp";
const Navbar = () => {
  const { userInfo } = useSelector((slice) => slice.auth);
  return (
    <div className="w-full flex  mb-14">
      <div className="flex px-10 fixed z-20 backdrop-blur-xl shadow-md lg:px-24  justify-between  items-center py-2 w-full  ">
        <Link to={"/"} className="content-center ">
          <img className=" w-12" src={logo} alt="jameen-kharido-icon " />
        </Link>
        <div className="lg:flex hidden py-3   px-5 gap-4  justify-between items-center ">
          <div className="flex justify-start border cursor-pointer rounded-md ">
            <input
              className="p-4 w-[600px]  rounded-l-md border-r-2 "
              placeholder="Raipur"
              type="text"
            />

            <p className="p-4    rounded-r-md bg-red-500 hover:bg-red-700 duration-500 cursor-pointer text-[#FFFFFF] text-base font-bold  px-12">
              Search
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-bold">
          <div className="flex   gap-4  items-center border-x h-full px-4">
            <div className="flex cursol-pointer">
              <Globe className="stroke-1 " />
              <p className="font-semibold">EN</p>
            </div>
            <div className="flex gap-4 items-center ">
              <Phone className="stroke-1 " />
              <div className="flex flex-col ">
                <p className="text-black font-medium">8770800807</p>
                <p className="text-xs text-gray-500"> Call us to visit</p>
              </div>
            </div>
          </div>
          <div className=" bg-red-500 lg:w-12   lg:size-12 rounded-full border ml-5">
            <img
              src={userInfo ? userInfo?.avatar : user}
              className=" lg:size-12 size-8  object-cover  object-container rounded-full overflow-hidden text-center"
              alt="profile"
            />
          </div>
          {!userInfo?.token ? (
            <div className="text-md ">
              <Link to="/login">
                <span>Login</span>
              </Link>{" "}
              /{" "}
              <Link to="/register">
                <span>Signup</span>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <span
                className="text-xs lg:text-lg "
                onClick={() =>
                  dispatch(customer_logout()).then(() => navigate("/"))
                }
              >
                Logout
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
