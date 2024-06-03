import { Dispatch, SetStateAction, useState } from "react";
import {
  convertToTitleCase,
  generateFilterByMonthYear,
} from "../../utils/helper";

interface FIReviewFilterrProps {
  filterApplied: string;
  setFilterApplied: Dispatch<SetStateAction<string>>;
}

export function FIReviewFilter(props: FIReviewFilterrProps) {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const monthYearArray = generateFilterByMonthYear();

  const handleFilter = (filterBy: string) => {
    props.setFilterApplied(filterBy);
    setFilterOpen(false);
  };

  return (
    <div className="relative inline-flex z-[1]">
      <span
        className="flex justify-end w-full min-w-[10rem] cursor-pointer items-center gap-x-2 text-sm font-medium text-blue127 transition-all hover:text-red1 disabled:pointer-events-none disabled:opacity-50"
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
        Date{props.filterApplied !== "" ? " :" : ""}
        <span className="opacity-75">
          {props.filterApplied !== "" ? `${props.filterApplied}` : ""}
        </span>
      </span>

      <div
        className={`duration absolute z-10 max-h-[150px] overflow-y-auto mt-7 w-full max-w-[12rem] rounded-lg border border-base127b bg-base127b p-2 shadow-md shadow-base1 transition-all ${
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

import { ChangeEvent } from "react";

import { InputField } from "../InputField.tsx";
import { Button } from "../Button.tsx";

interface FIFilterProps {
  choices: string[];
  filterApplied: { keyword: string; classification: string; priceSort: string };
  changePriceFilter: (price: string) => void;
  changeClassificationFilter: (classification: string) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onApply: () => void;
}

export function FIFilter(props: FIFilterProps) {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const handleClassificationFilter = (classification: string) => {
    props.changeClassificationFilter(classification);
    setFilterOpen(false);
  };

  return (
    <div className="flex gap-3 flex-col ">
      <span className="flex flex-col">
        <div className="flex mb-1 text-sm font-medium gap-2 text-blue127b">
          Keyword
        </div>
        <InputField
          name="keyword"
          type="text"
          placeholder="Keyword"
          onChange={props.onChange}
          defaultValue={props.filterApplied.keyword}
        />
      </span>

      <span className="flex flex-col">
        <div className="flex mb-1 text-sm font-medium gap-2 text-blue127b">
          Classification
        </div>

        <div className="relative inline-flex z-[1]">
          <span
            className="inline-flex bg-base127b shadow-sm p-2 rounded-lg w-full min-w-[10rem] cursor-pointer items-center gap-x-2 text-sm font-medium text-base127d transition-all hover:text-red1 disabled:pointer-events-none disabled:opacity-50"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <svg
              className={`size-4 ${
                filterOpen ? "rotate-180" : ""
              } transition-all`}
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
            <span className="opacity-75 font-normal">
              {props.filterApplied.classification !== ""
                ? `${convertToTitleCase(props.filterApplied.classification)}`
                : "Choose"}
            </span>
          </span>

          <div
            className={`duration absolute z-10 mt-12 w-full rounded-lg border border-base127b bg-base127b p-2 shadow-md shadow-base1 transition-all ${
              filterOpen
                ? "visible top-0 block opacity-100"
                : "pointer-events-none top-[-0.5rem] opacity-0"
            }`}
          >
            {props.choices.map((option, index) => (
              <span
                key={index}
                className={`flex font-normal cursor-pointer items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm hover:bg-base1 focus:bg-base1 focus:outline-none ${
                  props.filterApplied.classification === option
                    ? "text-blue127 bg-base127b2"
                    : "text-base127d"
                }`}
                onClick={() => {
                  if (props.filterApplied.classification !== option)
                    handleClassificationFilter(option);
                  else handleClassificationFilter("");
                }}
              >
                {convertToTitleCase(option)}
              </span>
            ))}
          </div>
        </div>
      </span>

      <span className="flex flex-col">
        <div className="flex mb-1 text-sm font-medium gap-2 text-blue127b">
          Price
        </div>

        <span
          className={`flex font-normal p-2 cursor-pointer items-center rounded-lg text-sm hover:bg-base1 focus:bg-base1 focus:outline-none ${
            props.filterApplied.priceSort === "Price (Low to High)"
              ? "text-blue127 bg-base127b"
              : "text-base127d"
          }`}
          onClick={() => {
            if (props.filterApplied.priceSort !== "Price (Low to High)")
              props.changePriceFilter("Price (Low to High)");
            else props.changePriceFilter("");
          }}
        >
          Price (Low to High)
        </span>
        <span
          className={`flex font-normal p-2 cursor-pointer items-center rounded-lg text-sm hover:bg-base1 focus:bg-base1 focus:outline-none ${
            props.filterApplied.priceSort === "Price (High to Low)"
              ? "text-blue127 bg-base127b"
              : "text-base127d"
          }`}
          onClick={() => {
            if (props.filterApplied.priceSort !== "Price (High to Low)")
              props.changePriceFilter("Price (High to Low)");
            else props.changePriceFilter("");
          }}
        >
          Price (High to Low)
        </span>
      </span>

      <div className="flex w-full gap-2">
        <Button
          action="apply"
          style="modal-blue"
          text="Apply"
          onClick={props.onApply}
        />
        <Button
          action="clear"
          style="modal-blue"
          text="Clear"
          onClick={props.onClear}
        />
      </div>
    </div>
  );
}
