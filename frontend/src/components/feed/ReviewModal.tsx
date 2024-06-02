import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ZodError } from "zod";

import { reviewData, reviewErrors, reviewSchema } from "../../utils/schema.ts";
import { InputField } from "../InputField.tsx";
import { Button } from "../Button.tsx";
import { TextAreaField } from "../TextAreaField.tsx";
import { ESTStarRating } from "./ESTStarRating.tsx";
import { review } from "../../models/Models.tsx";
import api from "../../api/api.ts";
import axios from "axios";

interface ReviewModalProps {
  action: string;
  review?: review;
  closeModal: () => void;
}

export function ReviewModal(props: ReviewModalProps) {
  const [review, setReview] = useState<reviewData>({
    title: props.review ? props.review.title : "",
    comment: props.review ? props.review.comment : "",
    rating: props.review ? props.review.rating : 0,
  });
  const [errors, setErrors] = useState<reviewErrors | null>(null);

  /** Function - updates the user's details with the values entered */
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setReview((prevState) => ({
      ...prevState,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleTextAreaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /** Function - discards the changes made by user */
  const discardChanges = () => {
    props.closeModal();

    // reset inputs
    setErrors(null);
    setReview({
      title: "",
      comment: "",
      rating: 0,
    });
  };

  /** API Call - create new review */
  const createReview = async () => {
    try {
      const token = sessionStorage.getItem("tt_token");
      await api.post(
        "/",
        { review: review },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Cannot create review";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    }
  };

  /** API Call - edit existing review */
  const editReview = async () => {
    try {
      const token = sessionStorage.getItem("tt_token");
      await api.patch(
        "/",
        { review: review },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Cannot create review";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    }
  };

  /** API Call - delete existing review */
  const deleteReview = async (reviewId: string) => {
    try {
      const token = sessionStorage.getItem("tt_token");
      await api.delete("/", {
        headers: {
          Authorization: token,
        },

        data: {
          reviewId: reviewId,
        },
      });
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Cannot delete review";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    }
  };

  /** Function - validates inputs in the form. Returns error messages if input is invalid */
  const saveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      reviewSchema.parse(review);
      setErrors(null);
      if (props.review) {
        if (
          props.review.comment === review.comment &&
          props.review.title === review.title &&
          props.review.rating === review.rating
        )
          props.closeModal();
        else editReview();
      } else {
        createReview();
      }
      props.closeModal();
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error);
      }
    }
  };

  // Disables scroll when modal is opened
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  console.log(props.review);
  console.log("SEPARATION");
  console.log(review);
  return (
    <form onSubmit={saveChanges}>
      <div className="pointer-events-none fixed start-0 top-0 z-20 size-full overflow-y-auto overflow-x-hidden">
        <div className="m-3 mt-0 flex min-h-[calc(100%-3.5rem)] items-center transition-all ease-out sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="pointer-events-auto flex h-full w-full flex-col rounded-xl border border-base127c bg-base127 shadow-md">
            <div className="flex items-center justify-between border-b border-base127c px-4 py-3">
              <h3 className="flex w-full justify-center text-xl font-semibold text-green0">
                {props.action === "edit" && "Edit review"}
                {props.action === "add" && "Add a review"}
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
                defaultValue={props.review ? props.review.rating : 0}
                onChange={handleUserInput}
              />

              <InputField
                type="text"
                name="title"
                label="Title"
                placeholder="Enter title"
                defaultValue={props.review ? props.review.title : ""}
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
                defaultValue={props.review ? props.review.comment : ""}
                error={
                  errors?.errors.find((error) => error.path[0] === "comment")
                    ?.message
                }
                onChange={handleTextAreaInput}
              />
            </div>

            <div className="flex items-center justify-end gap-x-2 overflow-auto border-t border-base127c px-4 py-3 text-sm italic text-grey0">
              {props.review !== undefined && (
                <span className="inline-flex items-center gap-x-2 rounded-lg text-sm font-medium text-black disabled:pointer-events-none disabled:opacity-50">
                  <span className="">
                    <Button
                      action="button"
                      style="red"
                      text="DELETE"
                      onClick={() => {
                        if (props.review !== undefined) {
                          deleteReview(props.review.reviewId);
                          props.closeModal();
                        } else {
                          props.closeModal();
                        }
                      }}
                    />
                  </span>
                </span>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-x-2 rounded-lg text-sm font-medium text-black disabled:pointer-events-none disabled:opacity-50"
              >
                <span className="">
                  <Button
                    action="submit"
                    style="blue"
                    text={
                      props.review
                        ? props.review.comment === review.comment &&
                          props.review.title === review.title &&
                          props.review.rating === review.rating
                          ? "CLOSE"
                          : "SAVE CHANGES"
                        : "SUBMIT"
                    }
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
