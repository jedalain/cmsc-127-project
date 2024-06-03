import { ChangeEvent, FormEvent, useState } from "react";
import { motion as m } from "framer-motion";
import { PiEnvelopeLight, PiHouse, PiLockKeyThin } from "react-icons/pi";
import { ZodError } from "zod";

import { Button } from "../components/Button.tsx";
import { InputField } from "../components/InputField.tsx";
import { signInData, signInErrors, signInSchema } from "../utils/schema.ts";
import { useNavigate } from "react-router-dom";
import api from "../api/api.ts";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  /** API Call - Sign in */
  const signIn = async () => {
    try {
      setIsLoading(true);

      const response = await api.post("/users/login", signinCredential);
      sessionStorage.setItem("tt_token", response.data.token);
      navigate("/");
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Invalid email or password";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    } finally {
      setIsLoading(false);
    }
  };

  /** Function - validates inputs in the form. Returns error messages if input is invalid */
  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signInSchema.parse(signinCredential);
      setErrors(null);
      signIn();
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error);
      }
    }
  };

  return (
    <div className="bg-orange127">
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
          onSubmit={handleSignIn}
          className="h-full max-h-[30rem] w-full max-w-[20rem] rounded-lg shadow-md bg-base127 flex flex-col p-9 items-center justify-center gap-6"
        >
          <span
            className="bg-base127 text-base127d p-2 rounded-full size-10 flex items-center justify-center cursor-pointer active:scale-95 transition-all active:bg-base127b"
            onClick={() => navigate("/")}
          >
            <PiHouse size={24} />
          </span>

          <span className="font-bold text-2xl uppercase text-orange127a">
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
              style="orange"
              disabled={isLoading}
              text={isLoading ? "SIGNING IN" : "SIGN IN"}
              onClick={() => {}}
            />

            <Button
              action="signUp"
              type="button"
              style="orange-alt"
              disabled={isLoading}
              text="SIGN UP"
              onClick={() => navigate("/sign-up")}
            />
          </div>
        </form>
      </m.div>
    </div>
  );
}
