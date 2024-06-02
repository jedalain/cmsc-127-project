import { PiSealWarning } from "react-icons/pi";

export function EmptyReviews() {
  return (
    <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center bg-base0">
      <div className="flex h-full w-full max-w-[1080px] flex-col items-center justify-center gap-3 p-6 text-red127">
        <PiSealWarning size={50} />
        <span className="text-2xl font-semibold">UH-OH</span>
        <span className="font-regular text-md">No reviews were found.</span>
      </div>
    </div>
  );
}

export function EmptyFoodItems() {
  return (
    <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center bg-base0">
      <div className="flex h-full w-full max-w-[1080px] flex-col items-center justify-center gap-3 p-6 text-red127">
        <PiSealWarning size={50} />
        <span className="text-2xl font-semibold">UH-OH</span>
        <span className="font-regular text-md">No food items were found.</span>
      </div>
    </div>
  );
}

export function EmptyEstablishments() {
  return (
    <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center bg-base0">
      <div className="flex h-full w-full max-w-[1080px] flex-col items-center justify-center gap-3 p-6 text-red127">
        <PiSealWarning size={50} />
        <span className="text-2xl font-semibold">UH-OH</span>
        <span className="font-regular text-md">
          No establishment/s were found.
        </span>
      </div>
    </div>
  );
}

export function EstablishmentNotFound() {
  return (
    <div className="flex h-full min-h-[600px] w-full flex-col items-center justify-center bg-base0">
      <div className="flex h-full w-full max-w-[1080px] flex-col items-center justify-center gap-3 p-6 text-red127">
        <PiSealWarning size={50} />
        <span className="text-2xl font-semibold">UH-OH</span>
        <span className="font-regular text-md">
          A problem was encountered while loading the establishment.
        </span>
      </div>
    </div>
  );
}

export function FoodItemNotFound() {
  return (
    <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center bg-base0">
      <div className="flex h-full w-full max-w-[1080px] flex-col items-center justify-center gap-3 p-6 text-red127">
        <PiSealWarning size={50} />
        <span className="text-2xl font-semibold">UH-OH</span>
        <span className="font-regular text-md">
          A problem was encountered while loading the food item.
        </span>
      </div>
    </div>
  );
}
