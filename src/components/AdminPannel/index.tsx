import { Tab } from "@headlessui/react";
import React from "react";
import DataTags from "../Modules/DataTags";
import Header from "../Modules/Header";
import PortfolioDetails from "../Modules/PorfolioDetails";
import PorfolioContent from "../Modules/PortfolioContents";

const AdminPannel = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-between mx-10 py-10 gap-10">
        <div className="w-full">
          <DataTags />
          <PorfolioContent />
        </div>
        <div className="w-[500px]">
          <PortfolioDetails />
        </div>
      </div>
    </div>
  );
};

export default AdminPannel;
