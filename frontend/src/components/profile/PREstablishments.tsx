import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  PiArrowsOutSimpleLight,
  PiPlusCircleFill,
  PiStarFill,
} from "react-icons/pi";

import { foodEstablishment, mcdo } from "../../models/Models.tsx";
import { Button } from "../Button.tsx";
import { PRCreateEstablishment } from "./PRCreateEstablishment.tsx";
import { AuthPageContext } from "../../pages/LoggedInPage.tsx";

interface PREstablishmentsProps {
  setEstablishmentId: Dispatch<SetStateAction<string>>;
}
export default function PREstablishments(props: PREstablishmentsProps) {
  const { isLoggedIn } = useContext(AuthPageContext);
  const navigate = useNavigate();
  const [newEstablishment, setNewEstablishment] = useState<boolean>(false);
  const [establishments, setEstablishments] = useState<foodEstablishment[]>([
    mcdo,
    mcdo,
    mcdo,
  ]);

  const isOwnerRoute = true;

  /** Function - closes the review modal */
  const toggleModal = () => {
    setNewEstablishment(!newEstablishment);
  };

  return (
    <div className="flex w-full h-full flex-col gap-3">
      <span className="flex justify-end w-full">
        <span>
          <Button
            type="button"
            action="addComment"
            style="blue"
            icon={PiPlusCircleFill}
            onClick={() => {
              setNewEstablishment(true);
              console.log(isLoggedIn && isOwnerRoute && newEstablishment);
            }}
          />
        </span>
      </span>
      <div className="h-full w-full gap-3 grid grid-cols-3 grid-rows-1">
        {establishments.map((establishment, index) => {
          return (
            <div key={index} className="w-full h-full flex flex-col gap-3">
              <div className="text-base127d gap-2 bg-base127b2 flex flex-col text-sm rounded-lg p-3 w-full h-[75px]">
                <span className="flex items-center justify-between font-medium">
                  <span className="flex gap-1 line-clamp-1 items-center">
                    {establishment.name}
                  </span>
                  <span
                    className="cursor-pointer hover:opacity-70 transition-all active:scale-95"
                    onClick={() => {
                      props.setEstablishmentId(establishment.establishmentId);
                    }}
                  >
                    <PiArrowsOutSimpleLight />
                  </span>
                </span>
                <span className="flex items-center gap-1 font-normal">
                  <PiStarFill color="#FDE767" /> {establishment.avgRating}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {isLoggedIn && isOwnerRoute && newEstablishment && (
        <AnimatePresence mode="wait">
          <m.span
            key={String(newEstablishment)}
            className="absolute z-[30] flex h-full max-w-full items-center justify-center bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            <PRCreateEstablishment
              action="add"
              closeModal={toggleModal}
              setAlertBubble={() => {}}
            />
          </m.span>
        </AnimatePresence>
      )}
    </div>
  );
}
