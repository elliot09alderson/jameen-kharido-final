import React from "react";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  return (
    <div className=" h-14 lg:h-20 bg-stone-700 text-white  font-semibold text-sm justify-center px-4 lg:px-24 lg:gap-12 gap-4 items-center flex">
      {[
        { title: "Home", path: "/" },
        { title: "Agents ad", path: "/agent/myAds" },
        { title: "Ads", path: "/ads" },
        { title: "post", path: "/agent/post" },
        // { title: "Contact", path: "/contact" },
      ].map((item, idx) => (
        <Link
          to={item.path}
          className="uppercase hover:text-stone-300 px-2  text-sm lg:text-lg"
        >
          <p>{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default QuickLinks;
