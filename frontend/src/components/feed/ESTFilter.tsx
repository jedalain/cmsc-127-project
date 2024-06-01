import { Dispatch, SetStateAction, useState } from "react";
import { PiStarFill } from "react-icons/pi";

interface ESTFilterProps {
  filterApplied: string;
  setFilterApplied: Dispatch<SetStateAction<string>>;
  sortEstablishments: () => void;
}

export function ESTFilter(props: ESTFilterProps) {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const handleFilter = (filterBy: string) => {
    props.setFilterApplied(filterBy);
    props.sortEstablishments();
    setFilterOpen(false);
  };

  return (
    <div className="relative inline-flex">
      <span
        className="inline-flex cursor-pointer items-center gap-x-2 text-sm font-medium text-blue127 transition-all hover:text-red1 disabled:pointer-events-none disabled:opacity-50"
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
        Rating{props.filterApplied !== "" ? " :" : ""}
        <span className="opacity-75">
          {props.filterApplied !== "" ? `${props.filterApplied}` : ""}
        </span>
      </span>

      <div
        className={`duration absolute z-10 mt-7 w-fit rounded-lg border border-base127b bg-base127b p-2 shadow-md shadow-base1 transition-all ${
          filterOpen
            ? "visible top-0 block opacity-100"
            : "pointer-events-none top-[-0.5rem] opacity-0"
        }`}
      >
        <span
          className={`flex cursor-pointer items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm hover:bg-base1 focus:bg-base1 focus:outline-none ${
            props.filterApplied === "5 STARS"
              ? "bg-base127b2 text-blue127"
              : "text-base127b2"
          }`}
          onClick={() => {
            if (props.filterApplied !== "5 STARS") handleFilter("5 STARS");
            else handleFilter("");
          }}
        >
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#FDE767" />
        </span>

        <span
          className={`flex cursor-pointer items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm hover:bg-base1 focus:bg-base1 focus:outline-none ${
            props.filterApplied === "4+ STARS"
              ? "text-blue127 bg-base127b2"
              : "text-base127b2"
          }`}
          onClick={() => {
            if (props.filterApplied !== "4+ STARS") handleFilter("4+ STARS");
            else handleFilter("");
          }}
        >
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#eddbc2" />
        </span>

        <span
          className={`flex cursor-pointer items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm hover:bg-base1 focus:bg-base1 focus:outline-none ${
            props.filterApplied === "3+ STARS"
              ? "text-blue127 bg-base127b2"
              : "text-base127b2"
          }`}
          onClick={() => {
            if (props.filterApplied !== "3+ STARS") handleFilter("3+ STARS");
            else handleFilter("");
          }}
        >
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#eddbc2" />
          <PiStarFill color="#eddbc2" />
        </span>

        <span
          className={`flex cursor-pointer items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm hover:bg-base1 focus:bg-base1 focus:outline-none ${
            props.filterApplied === "2+ STARS"
              ? "text-blue127 bg-base127b2"
              : "text-base127b2"
          }`}
          onClick={() => {
            if (props.filterApplied !== "2+ STARS") handleFilter("2+ STARS");
            else handleFilter("");
          }}
        >
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#eddbc2" />
          <PiStarFill color="#eddbc2" />
          <PiStarFill color="#eddbc2" />
        </span>

        <span
          className={`flex cursor-pointer items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm hover:bg-base1 focus:bg-base1 focus:outline-none ${
            props.filterApplied === "1+ STARS"
              ? "text-blue127 bg-base127b2"
              : "text-base127b2"
          }`}
          onClick={() => {
            if (props.filterApplied !== "1+ STARS") handleFilter("1+ STARS");
            else handleFilter("");
          }}
        >
          <PiStarFill color="#FDE767" />
          <PiStarFill color="#eddbc2" />
          <PiStarFill color="#eddbc2" />
          <PiStarFill color="#eddbc2" />
          <PiStarFill color="#eddbc2" />
        </span>
      </div>
    </div>
  );
}
