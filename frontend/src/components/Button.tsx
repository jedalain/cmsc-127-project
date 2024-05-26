import { MouseEvent } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  style: string;
  action: string;
  icon?: IconType;
  text?: string;
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button
 *
 * @param type - value of the button's type attribute
 * @param style - basis for the button's style
 * @param action - one word description about the button's purpose (eg. save)
 * @param text - text displayed in the button body
 * @param icon - icon displayed in body when button is too small
 * @param disabled - determines whether button is clickable or not
 * @param onClick - function to execute when button is clicked
 *
 * @returns button component
 */
export function Button(props: ButtonProps) {
  const getButtonStyle = () => {
    switch (props.style) {
      case "orange":
        return "font-regular w-full min-w-fit rounded-lg bg-orange127 p-3 text-white shadow-md transition-all hover:bg-orange127z active:scale-[0.97]";

      case "blue":
        return "font-regular w-full min-w-fit rounded-lg bg-blue127b p-3 text-white shadow-md transition-all hover:bg-blue127 active:scale-[0.97]";

      case "red":
        return "font-regular w-full min-w-fit rounded-lg bg-red127 p-3 text-white shadow-md transition-all hover:bg-red127b active:scale-[0.97]";

      case "red-alt":
        return "font-regular w-full min-w-fit rounded-lg bg-transparent p-3 text-red127 border-2 border-red127 shadow-md transition-all hover:text-red127b hover:border-red127b active:scale-[0.97]";

      case "modal-red":
        return "font-regular w-full min-w-fit max-w-[10rem] rounded-lg bg-red127 p-2 text-sm text-white shadow-md transition-all hover:bg-red1 active:scale-[0.97]";

      case "modal-red-alt":
        return "font-regular w-full min-w-fit max-w-[10rem] rounded-lg bg-transparent p-2 border-2 border-red127 text-sm text-red127 shadow-md transition-all hover:text-red1 hover:border-red1 active:scale-[0.97]";
    }
  };

  return (
    <>
      <button
        type={props.type}
        name={props.action}
        className={getButtonStyle()}
        disabled={props.disabled ? props.disabled : false}
        onClick={props.onClick}
      >
        {props.text ? (
          <span>{props.text}</span>
        ) : props.icon ? (
          <span>{<props.icon />}</span>
        ) : (
          ""
        )}
      </button>
    </>
  );
}
