import React, { useState } from "react";
import classes from "./signup/signup.module.css";
import Link from "next/link";
import useInput from "../../hooks/use-inputs";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const {
    enteredValue: enteredEmail,
    isValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    hasError: emailInputIsValid,
    reset: emailReset,
  } = useInput((value) => value.includes("@"));

  const {
    enteredValue: enteredPassword,
    isValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    hasError: passwordInputIsValid,
    reset: resetPassword,
  } = useInput((value) => value.length >= 7);

  let formIsValid = false;
  if (passwordIsValid && emailIsValid) {
    formIsValid = true;
  }

  //! Login submit Handler

  const loginHandler = async (e) => {
    e.preventDefault();

    const credentials = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      setloading(true);
      const result = await signIn("credentials", {
        redirect: false,
        ...credentials,
      });

      if (result.error) {
        throw new Error("Login failed please check your email and password");
      } else {
        router.push("/");
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes["form_area"]}>
        <p className={classes.title}>LOG IN</p>
        <form onSubmit={loginHandler}>
          <div className={classes["form_group"]}>
            <label className={classes["sub_title"]} htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => emailChangeHandler(e.target.value)}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              placeholder="Enter your email"
              id="email"
              className={classes["form_style"]}
              type="email"
            />
            {emailInputIsValid && (
              <p style={{ marginBottom: "0", color: "red", marginTop: "4px" }}>
                Please enter correct Email
              </p>
            )}
          </div>
          <div className={classes["form_group"]}>
            <label className={classes["sub_title"]} htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => passwordChangeHandler(e.target.value)}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
              placeholder="Enter your password"
              id="password"
              className={classes["form_style"]}
              type="password"
            />
            {passwordInputIsValid && (
              <p style={{ marginBottom: "0", color: "red", marginTop: "4px" }}>
                Password must be 7 character long
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={!formIsValid}
              className={classes.btn}
            >
              {loading ? "LOGGING In..." : "LOG IN"}
            </button>
            <p>
              Don&apos;t have an Account?
              <Link className={classes.link} href="/login/signup">
                SignUp Here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
