import { ChangeEvent, FormEvent, useState } from "react";
import { ZodError } from "zod";
import { motion as m } from "framer-motion";

import { signUpData, signUpErrors, signUpSchema } from "../utils/schema.ts";
import { InputField } from "../components/InputField.tsx";
import { Button } from "../components/Button.tsx";
import { useNavigate } from "react-router-dom";
import { PiHouse } from "react-icons/pi";

export default function SignUp() {
  const navigate = useNavigate();
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
    <div className="bg-blue127">
      <m.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.05,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="h-screen w-full flex flex-col justify-center items-center"
      >
        <form
          onSubmit={handleSignUp}
          className="h-fit max-h-[39rem] w-full max-w-[20rem] rounded-lg shadow-md bg-base127 flex flex-col p-9 items-center justify-center gap-6"
        >
          <span
            className="bg-base127 text-blue127b p-2 rounded-full size-10 flex items-center justify-center cursor-pointer active:scale-95 transition-all active:bg-base127b"
            onClick={() => navigate("/")}
          >
            <PiHouse size={24} />
          </span>

          <span className="font-bold text-2xl uppercase text-blue127">
            Sign Up
          </span>

          <div className="w-full flex flex-col overflow-y-auto px-1 gap-3">
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
              style="blue"
              text="CREATE ACCOUNT"
              onClick={() => {}}
            />

            <Button
              action="signIn"
              style="blue-alt"
              type="button"
              text="SIGN IN"
              onClick={() => {
                navigate("/sign-in");
              }}
            />
          </div>
        </form>
      </m.div>
    </div>
  );
}
