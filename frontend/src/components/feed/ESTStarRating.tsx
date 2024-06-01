import { ChangeEvent, useState } from "react";
import { InputErrorMessage } from "../InputErrorMessage.tsx";

interface ESTStarRatingProps {
  name: string;
  id?: string;
  error?: string;
  defaultValue?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ESTStarRating = (props: ESTStarRatingProps) => {
  const [rating, setRating] = useState<number>(
    props.defaultValue ? props.defaultValue : 0
  );
  const [hover, setHover] = useState<number>(0);

  const handleClick = (value: number) => {
    setRating(value);
  };

  return (
    <>
      <div id={props.id} className="flex justify-between mt-3">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name={props.name}
                value={ratingValue}
                onClick={() => handleClick(ratingValue)}
                onChange={props.onChange}
                style={{ display: "none" }}
              />
              <svg
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                fill={ratingValue <= (hover || rating) ? "#F3B95F" : "#eddbc2"}
                height="50"
                width="50"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .587l3.668 7.568L24 9.75l-6 5.853 1.415 8.45L12 18.751 4.585 24 6 15.603 0 9.75l8.332-1.595z" />
              </svg>
            </label>
          );
        })}
      </div>
      {props.error && <InputErrorMessage errorMessage={props.error} />}
    </>
  );
};
