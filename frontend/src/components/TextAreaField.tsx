import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { IconType } from "react-icons";

import { InputErrorMessage } from "./InputErrorMessage.tsx";

interface TextAreaFieldProps {
  icon?: IconType;
  label?: string;
  placeholder?: string;
  error?: string;
  id?: string;
  disabled?: boolean;
  defaultValue?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onEnter?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

/**
 * Input Field
 *
 * @param icon (optional) IconType from react-icons that is displayed inside the input field
 * @param toggleVisibility (optional)
 * @param label (optional) label located above the input field
 * @param placeholder (optional) text displayed when input field is empty
 * @param error (optional) error message for required form input fields
 * @param id (optional) value for the id attribute of the input field
 * @param name (required) value for the name attribute of the input field
 * @param onChange (required) function to execute when user enters something on the field
 *
 * @returns input field component
 */
export function TextAreaField(props: TextAreaFieldProps) {
  const [iconColor, setIconColor] = useState<string>("text-grey1");
  const [borderColor, setBorderColor] = useState<string>(
    "focus:ring focus:ring-1 focus:border-green127 focus:ring-green127"
  );

  /** Function - sets color of icon when input field is focused / unfocused */
  const focusedIcon = () => {
    const activeField = document.activeElement?.getAttribute("name");
    let targetColor = "";

    if (props.error && props.error.length > 0) {
      targetColor = "text-red127";
    } else {
      targetColor =
        activeField === props.name ? "text-green127" : "text-base127d";
    }

    setIconColor(targetColor);
  };

  /** Function - sets color of icon when input field is focused / unfocused */
  const focusedField = () => {
    let targetColor = "";

    if (props.error && props.error.length > 0) {
      targetColor =
        "focus:ring focus:ring-1 focus:border-red127 focus:ring-red127";
    } else {
      targetColor =
        "focus:ring focus:ring-1 focus:border-green127 focus:ring-green127";
    }

    setBorderColor(targetColor);
  };

  useEffect(() => {
    focusedIcon();
    focusedField();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.error]);

  return (
    <>
      {props.label && (
        <div className="w-full sm:col-span-3">
          <label
            htmlFor={props.name}
            className="font-regular mt-2.5 inline-block text-left text-sm text-base127d"
          >
            {props.label}
          </label>
        </div>
      )}

      {props.icon ? (
        // input field with icon
        <div className="relative sm:col-span-9">
          <span
            className={`absolute left-3 top-[0.65rem] ${iconColor} transition-all`}
          >
            <props.icon />
          </span>

          <textarea
            name={props.name}
            id={props.id}
            className={`block w-full resize-y rounded-lg bg-base127b outline-none py-2 pe-11 pl-9 pr-3 text-sm placeholder:text-base127d text-black127 placeholder:font-light shadow-sm transition-all disabled:pointer-events-none disabled:opacity-50 ${borderColor}`}
            placeholder={props.placeholder ? props.placeholder : ""}
            disabled={props.disabled ? props.disabled : false}
            onFocus={() => {
              focusedIcon();
              focusedField();
            }}
            defaultValue={props.defaultValue ? props.defaultValue : ""}
            onBlur={() => {
              focusedIcon();
              focusedField();
            }}
            onInput={props.onChange}
            onKeyDown={props.onEnter ? props.onEnter : undefined}
          />
        </div>
      ) : (
        // input field w/o icon
        <div className="relative sm:col-span-9">
          <textarea
            name={props.name}
            id={props.id ? props.id : undefined}
            className={`block w-full resize-y max-h-[200px] rounded-lg bg-base127b outline-none border-none pl-3 py-2 pe-11 placeholder:text-base127d text-black127 placeholder:font-light text-sm shadow-sm transition-all ${borderColor} disabled:pointer-events-none disabled:opacity-50`}
            placeholder={props.placeholder ? props.placeholder : ""}
            disabled={props.disabled ? props.disabled : false}
            defaultValue={props.defaultValue ? props.defaultValue : ""}
            onChange={props.onChange}
            onKeyDown={props.onEnter ? props.onEnter : undefined}
          />
        </div>
      )}

      {props.error && <InputErrorMessage errorMessage={props.error} />}
    </>
  );
}
