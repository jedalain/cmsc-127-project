import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ZodError } from "zod";

import {
  establishmentData,
  establishmentErrors,
  establishmentSchema,
} from "../../utils/schema.ts";
import { InputField } from "../InputField.tsx";
import { Button } from "../Button.tsx";
import { foodEstablishment } from "../../models/Models.tsx";

interface PRCreateEstablishmentProps {
  action: string;
  establishment?: foodEstablishment;
  setAlertBubble: Dispatch<SetStateAction<JSX.Element | null>>;
  closeModal: () => void;
}

export function PRCreateEstablishment(props: PRCreateEstablishmentProps) {
  const [review, setReview] = useState<establishmentData>({
    name: props.establishment ? props.establishment.name : "",
    address: props.establishment ? props.establishment.address : "",
  });
  const [errors, setErrors] = useState<establishmentErrors | null>(null);

  /** Function - updates the user's details with the values entered */
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  /** Function - validates inputs in the form. Returns error messages if input is invalid */
  const saveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      establishmentSchema.parse(review);
      setErrors(null);
      props.closeModal();
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error);
      }
    }
  };

  /** Function - discards the changes made by user */
  const discardChanges = () => {
    props.closeModal();

    // reset inputs
    setErrors(null);
    setReview({
      name: "",
      address: "",
    });
  };

  // Disables scroll when modal is opened
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <form onSubmit={saveChanges}>
      <div className="pointer-events-none fixed start-0 top-0 z-20 size-full overflow-y-auto overflow-x-hidden">
        <div className="m-3 mt-0 flex min-h-[calc(100%-3.5rem)] items-center transition-all ease-out sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="pointer-events-auto flex h-full w-full flex-col rounded-xl border border-base127c bg-base127 shadow-md">
            <div className="flex items-center justify-between border-b border-base127c px-4 py-3">
              <h3 className="flex w-full justify-center text-xl font-semibold text-green0">
                {props.action === "edit" && "Edit establishment"}
                {props.action === "add" && "Create establishment"}
              </h3>

              <button
                type="button"
                className="flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-black transition-all hover:bg-base1 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => {
                  discardChanges();
                  props.closeModal();
                }}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="size-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto p-4">
              <InputField
                type="text"
                name="name"
                label="Name"
                placeholder="Enter name of the establishment"
                defaultValue={
                  props.establishment ? props.establishment.name : ""
                }
                error={
                  errors?.errors.find((error) => error.path[0] === "name")
                    ?.message
                }
                onChange={handleUserInput}
              />

              <InputField
                type="text"
                name="location"
                label="Location"
                placeholder="Enter where establishment is located"
                defaultValue={
                  props.establishment ? props.establishment.address : ""
                }
                error={
                  errors?.errors.find((error) => error.path[0] === "location")
                    ?.message
                }
                onChange={handleUserInput}
              />

              <div className="flex items-center justify-end gap-x-2 overflow-auto border-t border-base127c px-4 py-3 text-sm italic text-grey0">
                {props.establishment && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-x-2 rounded-lg text-sm font-medium text-black disabled:pointer-events-none disabled:opacity-50"
                  >
                    <span className="">
                      <Button
                        action="button"
                        style="red"
                        text="DELETE"
                        onClick={discardChanges}
                      />
                    </span>
                  </button>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center gap-x-2 rounded-lg text-sm font-medium text-black disabled:pointer-events-none disabled:opacity-50"
                >
                  <span className="">
                    <Button
                      action="submit"
                      style="blue"
                      text="SUBMIT"
                      onClick={() => {}}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div
            className="pointer-events-auto absolute top-0 z-[-1] size-full bg-black opacity-60"
            onClick={() => {
              discardChanges();
              props.closeModal();
            }}
          ></div>
        </div>
      </div>
    </form>
  );
}
