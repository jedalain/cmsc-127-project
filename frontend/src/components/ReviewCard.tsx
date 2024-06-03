import { PiCalendar, PiStarFill, PiUserCircleThin } from "react-icons/pi";
import { review } from "../models/Models.tsx";
import { format, parseISO } from "date-fns";

interface ReviewCardProps {
  review: review;
}

export default function ReviewCard(props: ReviewCardProps) {
  const review = props.review;

  return (
    <div className="w-full text-base127d items-start gap-2 flex">
      <div className="text-base127d">
        <PiUserCircleThin size={45} />
      </div>

      <div className="w-full flex flex-col">
        <div className="font-regular items-center gap-3 flex">
          <span className="flex items-center gap-1">
            <PiStarFill color="#FDE767" />
            {review.rating}
          </span>
          <span>{review.title}</span>
        </div>

        <span className="text-sm mb-1 font-light">{review.comment}</span>

        <span className="text-xs items-center gap-1 flex font-light">
          <PiCalendar />
          {format(parseISO(review.dateModified), "MMM d, yyyy HH:mm:ss a")}
        </span>
      </div>
    </div>
  );
}
