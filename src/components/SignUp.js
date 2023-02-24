import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Input from "./Input";
import Button from "./Button";
import css from "./SignUp.module.css";
import userIcon from "../icons/user.svg";
import lockIcon from "../icons/lock.svg";
import { Notify } from "notiflix/build/notiflix-notify-aio";

Notify.init({
  width: "280px",
  position: "center-top",
});

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validation = async () => {
    const validationErrors = {};
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted");
    }
  };
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err.code === "auth/email-already-exists") {
        Notify.failure("Email already exists, please use diffrent email");
      } else console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validation();
    signIn();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <Input
        name="email"
        type="email"
        src={userIcon}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Input
        name="password"
        type="password"
        src={lockIcon}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <Button title="Sign Up" type="submit" />
    </form>
  );
}
