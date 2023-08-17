import React from "react";
import { DataType } from "../../types";
// export interface DataType {
//   [key: string]: string | number | React.ReactNode ;
// }

// interface Heading {
//   name: string
//   alias: string
// }

export interface TableProps {
  headings: any[];
  data: any[];
  addData?: (data: DataType) => void;
  className?: string;
  children?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({
  headings,
  data,
  //addData,
  className,
  children,
}) => {
  return (
    <div
      className={`border h-full border-border border-opacity-30 rounded-lg overflow-y-auto max-h-[10000px] scrollbar-thin scrollbar-thumb-zinc-200 ${className}`}
    >
      <div className="bg-primary-50 bg-opacity-80 text-black p-3 py-6">
        <div className="flex justify-between text-sm md:text-base lg:text-lg px-6 py-2 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-zinc-200">
          {headings.map((heading, index) => (
            <div key={index} className="inline-block min-w-[140px] mr-4">
              {heading.alias}
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 w-full h-3/4">
        {data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center w-full h-full">
            {children}
          </div>
        ) : (
          data?.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-between my-4 text-sm md:text-base lg:text-lg px-6 py-2 overflow-x-auto whitespace-normal scrollbar-thin scrollbar-thumb-zinc-200 "
            >
              {headings?.map((heading, index) => (
                <div key={index} className="min-w-[140px] mr-4 break-words">
                  {heading.alias === "Date Logged" || heading.alias?.includes("Date") ? new Date(row[heading?.name]).toLocaleDateString() :  row[heading?.name]}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
