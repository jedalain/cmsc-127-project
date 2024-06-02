import { useState, ChangeEvent, useEffect } from "react";
import { PiStarFill } from "react-icons/pi";

interface ESTStarRatingProps {
  name: string;
  id?: string;
  value: number; // Use value prop instead of defaultValue
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ESTStarRating = (props: ESTStarRatingProps) => {
  const [rating, setRating] = useState<number>(props.value ?? 0);
  const [hover, setHover] = useState<number>(0);

  useEffect(() => {
    setRating(props.value); // Update rating when value prop changes
  }, [props.value]);

  const handleClick = (value: number) => {
    setRating(value);
    props.onChange({
      target: {
        name: props.name,
        value: value.toString(),
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div id={props.id} className="flex items-center justify-between">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name={props.name}
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              style={{ display: "none" }}
            />
            <div
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              className={
                ratingValue <= (hover || rating)
                  ? "text-[#ffe138]"
                  : "text-[#eddbc2]"
              }
            >
              <PiStarFill size={30} />
            </div>
          </label>
        );
      })}
    </div>
  );
};
