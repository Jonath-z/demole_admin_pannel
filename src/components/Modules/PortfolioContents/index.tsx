import { Tab } from "@headlessui/react";
import React from "react";
import Articles from "./Articles_";

const PorfolioContent = () => {
  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex justify-center items-center gap-5 my-20">
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-blue-500 text-white px-10 py-3 border shadow-sm rounded-full transition-all font-bold"
                : "bg-white text-black px-10 py-3 border rounded-full transition-all"
            }
          >
            Articles
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-blue-500 text-white px-10 py-3 border shadow-sm rounded-full transition-all font-bold"
                : "bg-white text-black px-10 py-3 border rounded-full transition-all"
            }
          >
            Temoignages
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-blue-500 text-white px-10 py-3 border shadow-sm rounded-full transition-all font-bold"
                : "bg-white text-black px-10 py-3 border rounded-full transition-all"
            }
          >
            Services
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Articles />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PorfolioContent;
