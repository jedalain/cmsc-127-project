import { ChangeEvent } from "react";

import { ESTStarRating } from "./ESTStarRating.tsx";
import { InputField } from "../InputField.tsx";
import { Button } from "../Button.tsx";

interface ESTFilterProps {
  filterApplied: { keyword: string; rating: number };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onApply: () => void;
}

export function ESTFilter(props: ESTFilterProps) {
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
          hasClearBtn={true}
          onChange={props.onChange}
          defaultValue={props.filterApplied.keyword}
        />
      </span>

      <span className="flex flex-col">
        <div className="flex text-sm font-medium gap-2 text-blue127b">
          Rating
        </div>
        <div className="flex flex-col py-1 rounded-lg">
          <ESTStarRating
            name="rating"
            value={props.filterApplied.rating}
            onChange={props.onChange}
          />
        </div>
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
