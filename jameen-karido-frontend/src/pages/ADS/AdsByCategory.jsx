import React from "react";
import Navbar from "../HOME/Navbar.jsx";
import Ad from "./Ad.jsx";
import GetLocation from "./GetLocation";
import CategoryAds from "./CategoryAds.jsx";
const AdsByCategory = () => {
  return (
    <div>
      <Navbar />
      <CategoryAds />
      <GetLocation />
    </div>
  );
};

export default AdsByCategory;
