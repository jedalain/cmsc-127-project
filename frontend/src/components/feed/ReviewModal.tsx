import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ZodError } from "zod";

import { reviewData, reviewErrors, reviewSchema } from "../../utils/schema.ts";
import { InputField } from "../InputField.tsx";
import { Button } from "../Button.tsx";
import { TextAreaField } from "../TextAreaField.tsx";
import { ESTStarRating } from "./ESTStarRating.tsx";

interface ReviewModalProps {
  setAlertBubble: Dispatch<SetStateAction<JSX.Element | null>>;
  closeModal: () => void;
}

/**
 * CPEditProfile
 *
 * @param userDetails details of an instance of the User class
 * @param editProfile updates user profile data, when changes were saved, from the server
 * @param closeModal closes edit profile modal
 *
 * @returns modal for editing profile
 */
export function ReviewModal(props: ReviewModalProps) {
  const [estReview, setEstReview] = useState<reviewData>({
    title: "",
    comment: "",
    rating: 0,
  });
  const [errors, setErrors] = useState<reviewErrors | null>(null);

  /** Function - updates the user's details with the values entered */
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEstReview((prevState) => ({
      ...prevState,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleTextAreaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEstReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /** Function - validates inputs in the form. Returns error messages if input is invalid */
  const saveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      reviewSchema.parse(estReview);
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
    setEstReview({
      title: "",
      comment: "",
      rating: 0,
    });

    // set alert bubble
    // const alert = (
    //   <AlertBubble
    //     type="warning"
    //     message={`Changes to profile were not saved.`}
    //     setAlertBubble={props.setAlertBubble}
    //   />
    // );

    // props.setAlertBubble(alert); // show alert message
    // setTimeout(() => {
    //   props.setAlertBubble(null); // hide the alert after 5 seconds
    // }, 5000);
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
                Add a review
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
              <ESTStarRating
                error={
                  errors?.errors.find((error) => error.path[0] === "rating")
                    ?.message
                }
                name="rating"
                onChange={handleUserInput}
              />

              <InputField
                type="text"
                name="title"
                label="Title"
                placeholder="Enter title"
                error={
                  errors?.errors.find((error) => error.path[0] === "title")
                    ?.message
                }
                onChange={handleUserInput}
              />

              <TextAreaField
                name="comment"
                label="Comment"
                placeholder="Enter review"
                error={
                  errors?.errors.find((error) => error.path[0] === "comment")
                    ?.message
                }
                onChange={handleTextAreaInput}
              />
            </div>

            <div className="flex items-center justify-end gap-x-2 overflow-auto border-t border-base127c px-4 py-3 text-sm italic text-grey0">
              <button
                type="submit"
                className="inline-flex items-center gap-x-2 rounded-lg text-sm font-medium text-black disabled:pointer-events-none disabled:opacity-50"
              >
                <span className="">
                  <Button
                    action="button"
                    style="red"
                    text="DISCARD"
                    onClick={discardChanges}
                  />
                </span>
              </button>

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
    </form>
  );
}
