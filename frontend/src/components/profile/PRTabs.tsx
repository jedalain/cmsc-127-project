import { Dispatch, SetStateAction } from "react";

interface PRTabsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

/**
 * PRTabs
 *
 * @param activeTab current selected tab
 * @param setActiveTab function that sets the active tab
 *
 * @returns clickable tabs
 */
export function PRTabs(props: PRTabsProps) {
  return (
    <ul className="flex w-full min-w-[400px] items-center justify-between">
      <li
        className={`h-full w-full flex-1 py-4 ${
          props.activeTab === "reviews"
            ? "rounded-t-lg bg-base127b font-medium text-blue127"
            : "text-base127d"
        }`}
        onClick={() => props.setActiveTab("reviews")}
      >
        <button className="h-full w-full">Reviews</button>
      </li>

      <li
        className={`h-full w-full flex-1 py-4 ${
          props.activeTab === "establishments"
            ? "rounded-t-lg bg-base127b font-medium text-blue127"
            : "text-base127d"
        }`}
        onClick={() => props.setActiveTab("establishments")}
      >
        <button className="h-full w-full">Establishments</button>
      </li>
    </ul>
  );
}
