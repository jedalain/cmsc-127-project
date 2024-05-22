import { ChangeEvent, FormEvent, useState } from "react";
import { PiEnvelopeLight, PiLockKeyThin } from "react-icons/pi";
import { ZodError } from "zod";

import { Button } from "../components/Button.tsx";
import { InputField } from "../components/InputField.tsx";
import { signInData, signInErrors, signInSchema } from "../utils/schema.ts";

export default function SignIn() {
  const [signinCredential, setSigninCredential] = useState<signInData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<signInErrors | null>(null);

  /** Function - updates the searchInput state with current value entered in search bar */
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninCredential((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /** Function - validates inputs in the form. Returns error messages if input is invalid */
  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signInSchema.parse(signinCredential);
      setErrors(null);
      //   signIn();
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error);
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-red127">
      <form
        onSubmit={handleSignIn}
        className="h-full max-h-[30rem] w-full max-w-[20rem] rounded-lg shadow-md bg-base127 flex flex-col p-9 items-center justify-center gap-6"
      >
        <span className="font-bold text-2xl uppercase text-red127">
          Sign In
        </span>

        <div className="w-full flex flex-col gap-3">
          {/* Email */}
          <div>
            <InputField
              name="email"
              type="text"
              icon={PiEnvelopeLight}
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
              icon={PiLockKeyThin}
              error={
                errors?.errors.find((error) => error.path[0] === "password")
                  ?.message
              }
              placeholder="Password"
              onChange={handleUserInput}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Button
            action="signIn"
            type="submit"
            style="red"
            text="SIGN IN"
            onClick={() => {}}
          />

          <Button
            action="signUp"
            type="button"
            style="red-alt"
            text="SIGN UP"
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
}
