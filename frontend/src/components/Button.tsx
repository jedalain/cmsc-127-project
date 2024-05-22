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
      case "green":
        if (props.disabled)
          return "font-regular w-full min-w-fit rounded-lg bg-green0 p-3 text-white shadow-md transition-all disabled:opacity-60";
        return "font-regular w-full min-w-fit rounded-lg bg-green0 p-3 text-white shadow-md transition-all hover:bg-green1 active:scale-[0.97]";

      case "green-alt":
        if (props.disabled)
          return "font-regular w-full min-w-fit rounded-lg bg-green0 p-3 text-green0 border-2 border-green0 shadow-md transition-all disabled:opacity-60";
        return "font-regular w-full min-w-fit rounded-lg bg-transparent p-3 text-green0 border-2 border-green0 shadow-md transition-all hover:text-green1 hover:border-green1 active:scale-[0.97]";

      case "green-icon":
        if (props.disabled)
          return "font-regular size-[41px] flex items-center justify-center rounded-md bg-green1 text-sm text-white shadow-sm transition-all disabled:opacity-60";
        return "font-regular size-[41px] flex items-center justify-center rounded-md bg-green1 text-sm text-white shadow-sm transition-all hover:bg-green2 active:scale-[0.97]";

      case "modal-green":
        return "font-regular w-full min-w-fit max-w-[10rem] rounded-lg bg-green0 p-2 text-sm text-white shadow-md transition-all hover:bg-green1 active:scale-[0.97]";

      case "modal-green-alt":
        return "font-regular w-full min-w-fit max-w-[10rem] rounded-lg bg-base0 p-2 border-2 border-green0 text-sm text-green0 shadow-md transition-all hover:bg-base0 hover:text-green1 hover:border-green1 active:scale-[0.97]";

      case "red":
        return "font-regular w-full min-w-fit rounded-lg bg-red127 p-3 text-white shadow-md transition-all hover:bg-red1 active:scale-[0.97]";

      case "red-alt":
        return "font-regular w-full min-w-fit rounded-lg bg-transparent p-3 text-red127 border-2 border-red127 shadow-md transition-all hover:text-red1 hover:border-red1 active:scale-[0.97]";

      case "modal-red":
        return "font-regular w-full min-w-fit max-w-[10rem] rounded-lg bg-red127 p-2 text-sm text-white shadow-md transition-all hover:bg-red1 active:scale-[0.97]";

      case "modal-red-alt":
        return "font-regular w-full min-w-fit max-w-[10rem] rounded-lg bg-transparent p-2 border-2 border-red127 text-sm text-red127 shadow-md transition-all hover:text-red1 hover:border-red1 active:scale-[0.97]";

      case "yellow":
        return "font-regular w-full min-w-fit rounded-lg bg-yellow0 p-3 text-white shadow-md transition-all hover:bg-yellow1 active:scale-[0.97]";

      case "yellow-alt":
        return "font-regular w-full min-w-fit rounded-lg bg-transparent p-3 text-yellow0 border-2 border-yellow0 shadow-md transition-all hover:text-yellow1 hover:border-yellow1 active:scale-[0.97]";

      case "modal-yellow":
        return "font-regular w-full min-w-fit max-w-[10rem] rounded-lg bg-yellow0 p-2 text-sm text-white shadow-md transition-all hover:bg-yellow1 active:scale-[0.97]";

      case "modal-yellow-alt":
        return "font-regular w-full min-w-fit max-w-[10rem] rounded-lg bg-transparent p-2 text-yellow0 border-2 border-yellow0 text-sm shadow-md transition-all hover:text-yellow1 hover:border-yellow1 active:scale-[0.97]";
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
