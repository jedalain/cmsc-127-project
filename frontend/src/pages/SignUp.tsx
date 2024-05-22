import { ChangeEvent, FormEvent, useState } from "react";
import { ZodError } from "zod";

import { signUpData, signUpErrors, signUpSchema } from "../utils/schema.ts";
import { InputField } from "../components/InputField.tsx";
import { Button } from "../components/Button.tsx";

export default function SignUp() {
  const [successfulSignUp, setSuccessfulSignUp] = useState<boolean | null>(
    null
  );
  const [signUpCredential, setSignUpCredential] = useState<signUpData>({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    role: "User",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<signUpErrors | null>(null);

  /** Function - updates the signUpCredential state with the values entered */
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignUpCredential((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /** Function - updates the role in signUpCredential state with the role chosen */
  const handleRoleChange = (role: string) => {
    setSignUpCredential((prevState) => ({
      ...prevState,
      role: role,
    }));
  };

  /** Function - validates inputs in the form. Returns error messages if input is invalid */
  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signUpSchema.parse(signUpCredential);
      setErrors(null);
      //   signUp();
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error);
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-red127">
      <form
        onSubmit={handleSignUp}
        className="h-full max-h-[39rem] w-full max-w-[20rem] rounded-lg shadow-md bg-base127 flex flex-col p-9 items-center justify-center gap-6"
      >
        <span className="font-bold text-2xl uppercase text-red127">
          Sign Up
        </span>

        <div className="flex gap-3 w-full">
          <button
            type="button"
            className={`flex-1 p-3 rounded-lg border-2 active:scale-[0.95] transition-all ${
              signUpCredential.role === "User"
                ? "bg-green127 text-base127 border-green127 "
                : "bg-base127b text-base127c border-base127b"
            }`}
            onClick={() => handleRoleChange("User")}
          >
            User
          </button>
          <button
            type="button"
            className={`flex-1 p-3 rounded-lg border-2 active:scale-[0.95] transition-all ${
              signUpCredential.role === "Owner"
                ? "bg-green127 text-base127 border-green127 "
                : "bg-base127b text-base127c border-base127b"
            }`}
            onClick={() => handleRoleChange("Owner")}
          >
            Owner
          </button>
        </div>
        <div className="w-full flex flex-col overflow-y-auto gap-3">
          {/* First Name */}
          <div>
            <InputField
              name="fname"
              type="text"
              error={
                errors?.errors.find((error) => error.path[0] === "fname")
                  ?.message
              }
              placeholder="First Name"
              onChange={handleUserInput}
            />
          </div>

          {/* Middle name */}
          <div>
            <InputField
              name="mname"
              type="text"
              error={
                errors?.errors.find((error) => error.path[0] === "mname")
                  ?.message
              }
              placeholder="Middle Name"
              onChange={handleUserInput}
            />
          </div>

          {/* Last name */}
          <div>
            <InputField
              name="lname"
              type="text"
              error={
                errors?.errors.find((error) => error.path[0] === "lname")
                  ?.message
              }
              placeholder="Last Name"
              onChange={handleUserInput}
            />
          </div>

          {/* Email */}
          <div>
            <InputField
              name="email"
              type="text"
              error={
                errors?.errors.find((error) => error.path[0] === "email")
                  ?.message
              }
              placeholder="Email"
              onChange={handleUserInput}
            />
          </div>

          {/* Password */}
          <div>
            <InputField
              name="password"
              type="password"
              error={
                errors?.errors.find((error) => error.path[0] === "password")
                  ?.message
              }
              placeholder="Password"
              onChange={handleUserInput}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <InputField
              name="confirmPassword"
              type="password"
              error={
                errors?.errors.find(
                  (error) => error.path[0] === "confirmPassword"
                )?.message
              }
              placeholder="Confirm Password"
              onChange={handleUserInput}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Button
            action="signUp"
            type="submit"
            style="red"
            text="CREATE ACCOUNT"
            onClick={() => {}}
          />

          <Button
            action="signIn"
            style="red-alt"
            type="button"
            text="SIGN IN"
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
}
