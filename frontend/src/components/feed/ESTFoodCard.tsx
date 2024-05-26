import { PiStarFill } from "react-icons/pi";

interface FoodCardProps {
  name: string;
  avgRating: number;
  classification: string;
  price: number;
  openDetailed: () => void;
}

export default function FoodCard(props: FoodCardProps) {
  return (
    <div
      className="bg-base127b text-black127 h-[150px] w-full cursor-pointer justify-between p-3 rounded-lg flex flex-col transition-all hover:bg-orange127z active:scale-[0.95]"
      onClick={props.openDetailed}
    >
      <div className="flex text-md md:text-sm font-medium flex-col justify-between">
        <span className="flex-1 text-wrap">₱ {props.price}</span>
        <span className="flex-1 text-wrap">{props.name}</span>
      </div>

      <span className="flex items-center gap-1">
        <PiStarFill color="#FDE767" /> {props.avgRating}
      </span>
    </div>
  );
}
