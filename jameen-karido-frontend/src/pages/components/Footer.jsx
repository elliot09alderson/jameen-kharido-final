import React from "react";
import logo from "/image/white-oyo.png";
import { Hotel } from "lucide-react";
import play from "/image/google-play.png";
import app from "/image/app-store.png";

const data = [
  {
    heading: "OYO Hotels",
    options: [
      { link: "Hotels near me", path: "#" },
      { link: "Hotels in Manali", path: "#" },
      { link: "Hotels in Nainital", path: "#" },
      { link: "Hotels in Mount Abu", path: "#" },
      { link: "Hotels in Agra", path: "#" },
      { link: "Hotels in Haridwar", path: "#" },
      { link: "Hotels in Gurgaon", path: "#" },
      { link: "Hotels in Coimbatore", path: "#" },
      { link: "OYO Hotel UK", path: "#" },
      { link: "OYO Vacation Homes in Europe", path: "#" },
    ],
  },

  {
    heading: "OYO Hotels",

    options: [
      { link: "Hotels in Goa", path: "#" },
      { link: "Hotels in Udaipur", path: "#" },
      { link: "Hotels in Lonavala", path: "#" },
      { link: "Hotels in Kodaikanal", path: "#" },
      { link: "Hotels in Gangtok", path: "#" },
      { link: "Hotels in Kolkata", path: "#" },
      { link: "Hotels in Mandarmoni", path: "#" },
      { link: "Hotels in Kasauli", path: "#" },
      { link: "OYO Hotel USA", path: "#" },
      { link: "Homes in Scandinavia", path: "#" },
    ],
  },

  {
    heading: "OYO Hotels",
    options: [
      { link: "Hotels in Puri", path: "#" },
      { link: "Hotels in Mussoorie", path: "#" },
      { link: "Hotels in Munnar", path: "#" },
      { link: "Hotels in Hyderabad", path: "#" },
      { link: "Hotels in Coorg", path: "#" },
      { link: "Hotels in Ahmedabad", path: "#" },
      { link: "Hotels in Daman", path: "#" },
      { link: "Hotels in Dehradun", path: "#" },
      { link: "OYO Hotel Mexico", path: "#" },
      { link: "Homes in Southern Europe", path: "#" },
    ],
  },

  {
    heading: "OYO Hotels",
    options: [
      { link: "Hotels in Mahabaleshwar", path: "#" },
      { link: "Hotels in Pondicherry", path: "#" },
      { link: "Hotels in Bangalore", path: "#" },
      { link: "Hotels in Pune", path: "#" },
      { link: "Hotels in Chennai", path: "#" },
      { link: "Hotels in Shillong", path: "#" },
      { link: "Hotels in Yercaud", path: "#" },
      { link: "Travel Guide", path: "#" },
      { link: "OYO Hotel Brasil", path: "#" },
      { link: "Belvilla Holiday Homes", path: "#" },
    ],
  },

  {
    heading: "OYO Hotels",
    options: [
      { link: "Hotels in Jaipur", path: "#" },
      { link: "Hotels in Delhi", path: "#" },
      { link: "Hotels in Mysore", path: "#" },
      { link: "Hotels in Chandigarh", path: "#" },
      { link: "Hotels in Tirupati", path: "#" },
      { link: "Hotels in Rishikesh", path: "#" },
      { link: "Hotels in Amritsar", path: "#" },
      { link: "All Cities Hotels", path: "#" },
      { link: "Hotels in Japan", path: "#" },
      { link: "Traum Vacation Apartments", path: "#" },
    ],
  },

  {
    heading: "OYO Hotels",
    options: [
      { link: "Hotels in Shimla", path: "#" },
      { link: "Hotels in Mumbai", path: "#" },
      { link: "Hotels in Darjeeling", path: "#" },
      { link: "Hotels in Shirdi", path: "#" },
      { link: "Hotels in Dalhousie", path: "#" },
      { link: "Hotels in Varanasi", path: "#" },
      { link: "Hotels in Madurai", path: "#" },
      { link: "Coupons", path: "#" },
      { link: "OYO Hotel Indonesia", path: "#" },
      { link: "Traum Holiday Homes", path: "#" },
    ],
  },
];
const Footer = () => {
  return (
    <div className="bg-[rgb(109,120,125)] w-full ">
      <div className="lg:flex-row flex  flex-col lg:justify-between py-6 border-b lg:px-16">
        <div className="flex flex-col lg:flex-row justify-center gap-6 items-center">
          <img className="w-20" src={logo} alt="" />
          <p className="text-white lg:text-2xl text-xl text-center font-bold">
            World's leading chain of hotels and homes
          </p>
        </div>
        <div className="flex lg:flex-row flex-col  lg:justify-between gap-4 items-center">
          <p className="text-white lg:text-2xl text-xl text-center font-bold">
            Join our network and grow your business!
          </p>
          <div className="bg-white flex p-3 px-4 gap-2 rounded-md">
            <Hotel />
            <p className="text-[#6F787C] text-sm font-semibold">
              List your property
            </p>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row gap-12 flex-col lg:px-20   py-6 ">
        <div className="flex lg:w-1/3 items-center lg:items-start flex-col  lg:border-r gap-6">
          <p className="text-white font-medium ">
            Download OYO app for exciting offers.
          </p>
          <div className="flex  items-start  justify-start gap-4 ">
            <img className="p-0 w-40 h-18" src={app} alt="" />
            <img src={play} className=" w-40 h-18   " alt="playstore" />
          </div>
        </div>
        <div className="flex gap-14 lg:pl-10 lg:pr-24 text-white font-normal justify-center items-center ">
          <div className="flex flex-col gap-4">
            <p>About Us</p>
            <p>Teams / Careers</p>
            <p>Blogs</p>
            <p>Support</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>Official OYO Blog</p>
            <p>Investor Relations</p>
            <p>OYO Circle</p>
            <p>OYO Frames</p>
          </div>
        </div>
        <div className="flex gap-14 px-10 border-l text-white font-normal justify-center items-center">
          <div className="flex flex-col gap-4">
            <p>Terms and conditions</p>
            <p>Guest Policies</p>
            <p>Privacy Policy</p>
            <p>Trust And Safety</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>Cyber Security</p>
            <p>Cyber Security Awareness</p>
            <p>Responsible Disclosure</p>
            <p>Advertise your Homes</p>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col lg:justify-between gap-8  border-t px-16 lg:px-20 text-sm   text-white  py-12">
        {data.map((item, idx) => {
          return (
            <div key={idx} className="flex flex-col font-bold gap-3">
              <div className="">{item.heading}</div>
              {item.options.map((obj, idx) => (
                <li className="list-none cursor-pointer hover:underline">
                  {obj.link}
                </li>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
