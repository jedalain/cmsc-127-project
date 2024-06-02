import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ZodError } from "zod";

import {
  foodItemData,
  foodItemErrors,
  foodItemSchema,
} from "../../utils/schema.ts";
import { InputField } from "../InputField.tsx";
import { Button } from "../Button.tsx";
import { foodItem } from "../../models/Models.tsx";
import api from "../../api/api.ts";
import axios from "axios";

interface PRFoodItemModalProps {
  action: string;
  foodItem?: foodItem;
  closeModal: () => void;
}

export function PRFoodItemModal(props: PRFoodItemModalProps) {
  const [newFoodItem, setNewFoodItem] = useState<foodItemData>({
    name: props.foodItem ? props.foodItem.name : "",
    classification: props.foodItem ? props.foodItem.classification : "",
    price: props.foodItem ? props.foodItem.price : 0,
  });
  const [errors, setErrors] = useState<foodItemErrors | null>(null);

  /** Function - updates the user's details with the values entered */
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewFoodItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /** API Call - create new food item */
  const createFoodItem = async () => {
    try {
      const token = sessionStorage.getItem("tt_token");
      await api.post(
        "/",
        { foodItem: newFoodItem },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Cannot create food item";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    }
  };

  /** API Call - edit existing food item */
  const editFoodItem = async (foodItemId: string) => {
    try {
      const token = sessionStorage.getItem("tt_token");
      await api.patch(
        "/",
        { foodItem: newFoodItem, foodItemId: foodItemId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Cannot edit food item";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    }
  };

  /** API Call - delete existing food item */
  const deleteFoodItem = async (foodItemId: string) => {
    try {
      const token = sessionStorage.getItem("tt_token");
      await api.delete("/", {
        headers: {
          Authorization: token,
        },

        data: {
          foodItemId: foodItemId,
        },
      });
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Cannot delete food item";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    }
  };

  /** Function - validates inputs in the form. Returns error messages if input is invalid */
  const saveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newFoodItem.price = parseFloat(newFoodItem.price);

    try {
      foodItemSchema.parse(newFoodItem);
      setErrors(null);
      if (props.foodItem) {
        if (
          props.foodItem.name === newFoodItem.name &&
          props.foodItem.classification === newFoodItem.classification &&
          props.foodItem.price === newFoodItem.price
        )
          props.closeModal();
        else editFoodItem(props.foodItem.foodItemId);
      } else {
        createFoodItem();
      }
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
    setNewFoodItem({
      name: "",
      classification: "",
      price: 0,
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
      <div className="pointer-events-none fixed start-0 top-0 z-[20] size-full overflow-y-auto overflow-x-hidden">
        <div className="m-3 mt-0 flex min-h-[calc(100%-3.5rem)] items-center transition-all ease-out sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="pointer-events-auto flex h-full w-full flex-col rounded-xl border border-base127c bg-base127 shadow-md">
            <div className="flex items-center justify-between border-b border-base127c px-4 py-3">
              <h3 className="flex w-full justify-center text-xl font-semibold text-green0">
                {props.action === "edit" && "Edit food item"}
                {props.action === "add" && "Create new food item"}
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
                placeholder="Enter name of your food item"
                defaultValue={props.foodItem ? props.foodItem.name : ""}
                error={
                  errors?.errors.find((error) => error.path[0] === "name")
                    ?.message
                }
                onChange={handleUserInput}
              />

              <InputField
                type="text"
                name="classification"
                label="Type"
                placeholder="Enter type of food item"
                defaultValue={
                  props.foodItem ? props.foodItem.classification : ""
                }
                error={
                  errors?.errors.find(
                    (error) => error.path[0] === "classification"
                  )?.message
                }
                onChange={handleUserInput}
              />

              <InputField
                type="number"
                name="price"
                label="Price"
                placeholder="Enter price of food item"
                defaultValue={props.foodItem ? props.foodItem.price : 0}
                error={
                  errors?.errors.find((error) => error.path[0] === "price")
                    ?.message
                }
                onChange={handleUserInput}
              />
            </div>

            <div className="flex items-center justify-end gap-x-2 overflow-auto border-t border-base127c px-4 py-3 text-sm italic text-grey0">
              {props.foodItem && (
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 rounded-lg text-sm font-medium text-black disabled:pointer-events-none disabled:opacity-50"
                >
                  <span className="">
                    <Button
                      action="button"
                      style="red"
                      text="DELETE"
                      onClick={() => {
                        if (props.foodItem !== undefined) {
                          deleteFoodItem(props.foodItem.foodItemId);
                          props.closeModal();
                        } else {
                          props.closeModal();
                        }
                      }}
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
                    text={
                      props.foodItem
                        ? props.foodItem.name === newFoodItem.name &&
                          props.foodItem.classification ===
                            newFoodItem.classification &&
                          props.foodItem.price === newFoodItem.price
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
