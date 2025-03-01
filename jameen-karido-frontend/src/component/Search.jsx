import { SearchCheck, SearchIcon, X } from "lucide-react";
import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ setSearch }) => {
  return (
    <div className="flex  cursor-pointer items-center  py-2 ">
      <X onClick={() => setSearch(false)} className="h-10 size-6" />
      <input
        className="lg:p-4 lg:w-[400px] min-w-[280px] h-10  pl-4 border-2 lg:rounded-l-md lg:border-r  p-1 border-gray-500"
        placeholder="Banglore"
        type="text"
      />
      <p className="lg:p-4 lg:border-r font-semibold text-md  border-gray-500 bg-white lg:pr-24 text-black"></p>
      <p className="lg:p-4 lg:border-r text-lg font-semibold border-gray-500 lg:pr-24 bg-white text-black"></p>
      <p className="lg:p-4 rounded-r-md bg-[#1AB64F] px-6 mt py-2 hover:bg-[#128036] text-[#FFFFFF] lg:text-xl font-bold  flex lg:px-12">
        Search
      </p>
      {/* <div
            className="flex lg:hidden cursol-pointer items-center gap-1 h-20  lg:border-r overflow-hidden "
            onClick={() => setSearch(false)}
          >
            <FaSearch className="stroke-1 size-5" />
          </div> */}
    </div>
  );
};

export default Search;
