import React from "react";
import Search from "../../component/Search";

const Searchbar = () => {
  return (
    <div className="lg:flex flex-col w-full justify-center h-[250px] bg-[#575757] hidden ">
      <div className="flex items-center py-10  gap-6  flex-col  ">
        <p className="text-white font-bold text-3xl py-0 ">
          Over 174,000+ hotels and homes across 35+ countries
        </p>
        <Search/>

        <div className="flex justify-start ">
          <h1>Continue your search</h1>
          <p className="">koramangala· Guests</p>
          <p>bangalore· Guests</p>
          <p>indiranagar· Guests</p>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
