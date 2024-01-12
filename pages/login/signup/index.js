import { useState } from "react";
import classes from "./signup.module.css";
import Link from "next/link";
import useInput from "../../../hooks/use-inputs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function page() {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const {
    enteredValue: enteredEmail,
    isValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    hasError: emailInputIsValid,
    reset: emailReset,
  } = useInput((value) => value.includes("@"));

  const {
    enteredValue: enteredName,
    isValid: nameIsValid,
    inputChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHanlder,
    hasError: nameInputIsValid,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredPassword,
    isValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    hasError: passwordInputIsValid,
    reset: resetPassword,
  } = useInput((value) => value.length >= 7);

  let formIsValid = false;
  if (nameIsValid && passwordIsValid && emailIsValid) {
    formIsValid = true;
  }
  //! Submitting form
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setisLoading(true);

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        email: enteredEmail,
        name: enteredName,
        password: enteredPassword,
      });

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const res = await fetch("/api/users", requestOptions);
      const successMess = await res.json();

      if (!res.ok) {
        throw new Error(successMess.message);
      }
      emailReset();
      resetName();
      resetPassword();
      router.push("/login");
      toast.success(successMess.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes["form_area"]}>
        <p className={classes.title}>SIGN UP</p>
        <form onSubmit={formSubmitHandler}>
          <div className={classes["form_group"]}>
            <label className={classes["sub_title"]} htmlFor="name">
              Name
            </label>
            <input
              value={enteredName}
              onChange={(e) => nameChangeHandler(e.target.value)}
              onBlur={nameBlurHanlder}
              placeholder="Enter your full name"
              className={classes["form_style"]}
              type="text"
            />
            {nameInputIsValid && (
              <p style={{ marginBottom: "0", color: "red", marginTop: "4px" }}>
                Please enter correct Username
              </p>
            )}
          </div>
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
            <button disabled={!formIsValid} className={classes.btn}>
              {isLoading ? "REGISTERING..." : "SIGN UP"}
            </button>
            <p>
              Have an Account?
              <Link className={classes.link} href="/login">
                Login Here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
