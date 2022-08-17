import React from "react";

interface IProps {
  contentTitle: string;
}

const DataNotFound = ({ contentTitle }: IProps) => {
  return (
    <div className="text-center py-5 text-red-500">
      {contentTitle} Not found in database
    </div>
  );
};

export default DataNotFound;
