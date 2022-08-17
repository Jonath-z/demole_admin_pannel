import React, { useEffect, useState } from "react";
import databaseServices from "../../../services/databaseServices";
import { TArticle } from "../../../Types";
import { VArticle, VFeedback, VService } from "../__vectors";

const DataTags = () => {
  const [articles, setArticles] = useState<TArticle[]>([]);

  useEffect(() => {
    (async () => {
      databaseServices.getData("articles", (data: TArticle[]) => {
        setArticles(data);
      });
    })();
  }, []);

  return (
    <div className="flex justify-center gap-10 w-full">
      <div className="flex gap-5 justify-start items-center bg-white border h-fit p-5 rounded-lg shadow-lg">
        <p className="bg-teal-300 p-5 rounded-full w-fit">
          <VArticle className="text-2xl text-white" />
        </p>
        <div>
          <p className="font-bold">{articles.length} Articles</p>
        </div>
      </div>
      <div className="flex gap-5 justify-start items-center bg-white border h-fit p-5 rounded-lg shadow-lg">
        <p className="bg-red-600 p-5 rounded-full w-fit">
          <VService className="text-2xl text-white" />
        </p>
        <div>
          <p className="font-bold">6 Services</p>
        </div>
      </div>
      <div className="flex gap-5 justify-start items-center bg-white border h-fit p-5 rounded-lg shadow-lg">
        <p className="bg-sky-700 p-5 rounded-full w-fit">
          <VFeedback className="text-2xl text-white" />
        </p>
        <div>
          <p className="font-bold">10 Temoignages</p>
        </div>
      </div>
    </div>
  );
};

export default DataTags;
