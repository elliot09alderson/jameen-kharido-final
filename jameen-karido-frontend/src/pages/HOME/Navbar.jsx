import React, { useEffect, useState } from "react";
import logo from "/image/oyo-logo1.png";
import internet from "/image/internet.png";
import login from "/image/login.png";
import { FaSearch } from "react-icons/fa";
import Searchbar from "./Searchbar";
import user from "/image/user.webp";

import {
  Activity,
  BriefcaseBusiness,
  Building2,
  CircleUser,
  Globe,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  admin_logout,
  customer_logout,
  agent_logout,
} from "../../rtk/slices/authSlice.js";
import { toast } from "react-toastify";
import Search from "../../component/Search";

const Navbar = () => {
  const { userInfo, successMessage, errorMessage, loader } = useSelector(
    (slice) => slice.auth
  );

  const [search, setSearch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [successMessage, errorMessage]);

  const NavbarData = [
    {
      title: "Become a Member",
      subheading: "Additional 10% off on stays",
      icon: Activity,
    },
    {
      title: "join for Business",
      subheading: "Trusted by 5000 Corporates",
      icon: BriefcaseBusiness,
    },
    {
      title: "List your property",
      subheading: "Start earning in 30 mins",
      icon: Building2,
    },
    {
      title: "0124-6201611",
      icon: Phone,

      subheading: "Call us to Book now",
    },
  ];
  return (
    <div className=" w-full   lg:h-[70px]  shadow-lg px-4 lg:px-10 ">
      {!search && (
        <div className="flex items-center justify-between">
          <div className="">
            <Link to="/admin/login">
              <img className="w-12 lg:w-24 " src={logo} alt="oyo-icon" />
            </Link>
          </div>

          <div className="flex">
            {NavbarData.map((item, idx) => (
              <div className="px-6 justify-center  cursor-pointer h-[70px] hidden lg:flex  border-r  ">
                <div className="flex items-center pr-4">
                  <item.icon className=" text-[#939393]" />
                </div>
                <div className="flex flex-col justify-center  ">
                  <p className="font-semibold text-md">{item.title}</p>
                  <p className="text-xs font-normal text-gray-500">
                    {item.subheading}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex lg:hidden cursol-pointer items-center gap-1 h-20  lg:border-r overflow-hidden "
            onClick={() => setSearch(true)}
          >
            <FaSearch className="stroke-1 size-5" />
          </div>
          <div className="flex items-center gap-2 font-bold">
            <div className=" rounded-full border">
              <img
                src={userInfo ? userInfo?.avatar : user}
                className="lg:size-9 hidden lg:flex object-cover size-6 object-container rounded-full overflow-hidden text-center"
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
                  onClick={() => {
                    userInfo?.role == "agent"
                      ? dispatch(agent_logout()).then(() => navigate("/"))
                      : userInfo?.role == "admin"
                      ? dispatch(admin_logout()).then(() => navigate("/"))
                      : dispatch(customer_logout()).then(() => navigate("/"));
                  }}
                >
                  Logout
                </span>
              </Link>
            )}
          </div>
          <div className="flex cursol-pointer items-center gap-1 h-20 px-4  ">
            <Globe className="stroke-1 " />
            <p className="font-bold flex">English </p>
          </div>
        </div>
      )}
      {search && (
        <div className=" bg-white  flex items-center h-full justify-center">
          <Search setSearch={setSearch} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
