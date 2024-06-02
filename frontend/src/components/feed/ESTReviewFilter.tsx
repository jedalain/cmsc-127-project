import { Dispatch, SetStateAction, useState } from "react";

interface ESTReviewFilterProps {
  filterApplied: string;
  setFilterApplied: Dispatch<SetStateAction<string>>;
}

export function ESTReviewFilter(props: ESTReviewFilterProps) {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthYearArray = [];

  for (let year = 2020; year <= currentYear; year++) {
    const startMonth = year === 2020 ? 1 : 0; // start from January 2020
    const endMonth = year === currentYear ? currentMonth : 12; // ends at current month if it's the current year, otherwise end at December

    for (let month = startMonth; month < endMonth; month++) {
      const monthName = monthNames[month];
      monthYearArray.push(`${monthName} ${year}`);
    }
  }
  monthYearArray.reverse();

  const handleFilter = (filterBy: string) => {
    props.setFilterApplied(filterBy);
    setFilterOpen(false);
  };

  return (
    <div className="relative inline-flex z-[1]">
      <span
        className={`inline-flex min-w-44 cursor-pointer items-center gap-x-2 text-sm font-medium text-blue127 transition-all hover:text-red1 disabled:pointer-events-none disabled:opacity-50`}
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
        Created at{props.filterApplied !== "" ? " :" : ""}
        <span className="opacity-75">
          {props.filterApplied !== "" ? `${props.filterApplied}` : ""}
        </span>
      </span>

      <div
        className={`duration absolute overflow-y-auto max-h-[150px] z-10 mt-7 w-full min-w-[11rem] rounded-lg border border-base127b bg-base127b p-2 shadow-md shadow-base1 transition-all ${
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
            {option.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
