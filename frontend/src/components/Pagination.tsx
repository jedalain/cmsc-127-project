import { Dispatch, MouseEvent, SetStateAction } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

/**
 * Pagination
 *
 * @param currentPage the current page where the user is in
 * @param totalPages total number of pages available
 * @param setCurrentPage sets the value (current page) of the state object
 *
 * @returns pagination button
 */
export function Pagination(props: Props) {
  const handlePagination = (
    e: MouseEvent<HTMLButtonElement>,
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    totalPages: number
  ) => {
    const { name } = e.currentTarget;
    if (name === "back" && currentPage > 1)
      setCurrentPage((prev) => prev - 1); // go back (min. 1)
    else if (name === "next" && currentPage < totalPages)
      setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <nav className="flex w-full items-center justify-center gap-x-1">
        <button
          type="button"
          name="back"
          className="inline-flex min-h-[27px] min-w-[27px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-sm text-green127 transition-all hover:bg-base1 focus:bg-base1 focus:outline-none active:scale-[0.9] disabled:pointer-events-none disabled:opacity-50"
          disabled={props.currentPage === 1}
          onClick={(e) =>
            handlePagination(
              e,
              props.currentPage,
              props.setCurrentPage,
              props.totalPages
            )
          }
        >
          <svg
            className="size-3.5 flex-shrink-0"
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
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <span aria-hidden="true" className="sr-only">
            Previous
          </span>
        </button>

        <div className="flex items-center gap-x-1">
          <span className="flex min-h-[27px] min-w-[27px] items-center justify-center rounded-lg bg-base1 px-3 py-2 text-sm text-gray127 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            {props.currentPage}
          </span>
          <span className="flex min-h-[27px] items-center justify-center px-1.5 py-2 text-sm text-green127">
            of
          </span>
          <span className="flex min-h-[27px] items-center justify-center px-1.5 py-2 text-sm text-green127">
            {props.totalPages === 0 ? 1 : props.totalPages}
          </span>
        </div>

        <button
          type="button"
          name="next"
          className="inline-flex min-h-[27px] min-w-[27px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-sm text-green127 transition-all hover:bg-base1 focus:bg-base1 focus:outline-none active:scale-[0.9] disabled:pointer-events-none disabled:opacity-50"
          disabled={
            props.currentPage === props.totalPages || props.totalPages === 0
          }
          onClick={(e) =>
            handlePagination(
              e,
              props.currentPage,
              props.setCurrentPage,
              props.totalPages
            )
          }
        >
          <span aria-hidden="true" className="sr-only">
            Next
          </span>
          <svg
            className="size-3.5 flex-shrink-0"
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
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </nav>
    </>
  );
}
