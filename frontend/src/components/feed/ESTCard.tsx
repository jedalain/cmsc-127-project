import { PiStarFill } from "react-icons/pi";

interface ESTCardProps {
  name: string;
  avgRating: number;
  address: string;
  openDetailed: () => void;
}

export default function ESTCard(props: ESTCardProps) {
  return (
    <div
      className="bg-orange127a text-base127b h-[81px] cursor-pointer justify-between p-3 rounded-lg w-full flex flex-col transition-all hover:bg-orange127z active:scale-[0.95]"
      onClick={props.openDetailed}
    >
      <div className="flex text-md md:text-sm font-medium justify-between">
        <span className="flex-1 text-wrap">{props.name}</span>
        <span className="flex-1 flex items-center justify-end gap-1">
          <PiStarFill color="#FDE767" /> {props.avgRating}
        </span>
      </div>

      <span className="text-md md:text-xs line-clamp-2 md:line-clamp-3 font-light">
        {props.address}
      </span>
    </div>
  );
}
