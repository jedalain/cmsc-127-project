import { Dispatch, SetStateAction, useState } from "react";
import { generateFilterByMonthYear } from "../../utils/helper";

interface FIFilterProps {
  choices: string[];
  filterApplied: string;
  setFilterApplied: Dispatch<SetStateAction<string>>;
}

export function FITypeFilter(props: FIFilterProps) {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const handleFilter = (filterBy: string) => {
    props.setFilterApplied(filterBy);
    setFilterOpen(false);
  };

  return (
    <div className="relative inline-flex z-[1]">
      <span
        className="inline-flex w-56 max-w-[10rem] cursor-pointer items-center gap-x-2 text-sm font-medium text-blue127 transition-all hover:text-red1 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => setFilterOpen(!filterOpen)}
      >
        <svg
          className={`size-4 ${filterOpen ? "rotate-180" : ""} transition-all`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
        Type{props.filterApplied !== "" ? " :" : ""}
        <span className="opacity-75">
          {props.filterApplied !== "" ? `${props.filterApplied}` : ""}
        </span>
      </span>

      <div
        className={`duration absolute z-10 mt-7 w-full min-w-[10rem] max-h-[100px] overflow-y-auto rounded-lg border border-base127b bg-base127b p-2 shadow-md shadow-base1 transition-all ${
          filterOpen
            ? "visible top-0 block opacity-100"
            : "pointer-events-none top-[-0.5rem] opacity-0"
        }`}
      >
        {props.choices.map((option, index) => (
          <span
            key={index}
            className={`flex font-normal cursor-pointer items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm hover:bg-base1 focus:bg-base1 focus:outline-none ${
              props.filterApplied === option
                ? "text-blue127 bg-base127b2"
                : "text-base127d"
            }`}
            onClick={() => {
              if (props.filterApplied !== option) handleFilter(option);
              else handleFilter("");
            }}
          >
            {option.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FIPriceFilter(props: FIFilterProps) {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const handleFilter = (filterBy: string) => {
    props.setFilterApplied(filterBy);
    setFilterOpen(false);
  };

  return (
    <div className="relative inline-flex z-[1]">
      <span
        className="inline-flex w-full min-w-[10rem] cursor-pointer items-center gap-x-2 text-sm font-medium text-blue127 transition-all hover:text-red1 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => setFilterOpen(!filterOpen)}
      >
        <svg
          className={`size-4 ${filterOpen ? "rotate-180" : ""} transition-all`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
        Sort by{props.filterApplied !== "" ? " :" : ""}
        <span className="opacity-75">
          {props.filterApplied !== "" ? `${props.filterApplied}` : ""}
        </span>
      </span>

      <div
        className={`duration absolute z-10 mt-7 w-full rounded-lg border border-base127b bg-base127b p-2 shadow-md shadow-base1 transition-all ${
          filterOpen
            ? "visible top-0 block opacity-100"
            : "pointer-events-none top-[-0.5rem] opacity-0"
        }`}
      >
        {props.choices.map((option, index) => (
          <span
            key={index}
            className={`flex font-normal cursor-pointer items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm hover:bg-base1 focus:bg-base1 focus:outline-none ${
              props.filterApplied === option
                ? "text-blue127 bg-base127b2"
                : "text-base127d"
            }`}
            onClick={() => {
              if (props.filterApplied !== option) handleFilter(option);
              else handleFilter("");
            }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FIReviewFilter(props: FIFilterProps) {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const monthYearArray = generateFilterByMonthYear();

  const handleFilter = (filterBy: string) => {
    props.setFilterApplied(filterBy);
    setFilterOpen(false);
  };

  return (
    <div className="relative inline-flex z-[1]">
      <span
        className="inline-flex w-full min-w-[10rem] cursor-pointer items-center gap-x-2 text-sm font-medium text-blue127 transition-all hover:text-red1 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => setFilterOpen(!filterOpen)}
      >
        <svg
          className={`size-4 ${filterOpen ? "rotate-180" : ""} transition-all`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
        Sort by{props.filterApplied !== "" ? " :" : ""}
        <span className="opacity-75">
          {props.filterApplied !== "" ? `${props.filterApplied}` : ""}
        </span>
      </span>

      <div
        className={`duration absolute z-10 max-h-[150px] overflow-y-auto mt-7 w-full rounded-lg border border-base127b bg-base127b p-2 shadow-md shadow-base1 transition-all ${
          filterOpen
            ? "visible top-0 block opacity-100"
            : "pointer-events-none top-[-0.5rem] opacity-0"
        }`}
      >
        {monthYearArray.map((option, index) => (
          <span
            key={index}
            className={`flex font-normal cursor-pointer items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm hover:bg-base1 focus:bg-base1 focus:outline-none ${
              props.filterApplied === option
                ? "text-blue127 bg-base127b2"
                : "text-base127d"
            }`}
            onClick={() => {
              if (props.filterApplied !== option) handleFilter(option);
              else handleFilter("");
            }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
}
