import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import css from "./Login.module.css";
import userIcon from "../icons/user.svg";
import lockIcon from "../icons/lock.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export default function Login() {
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

  const loginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        Notify.failure("Wrong email or password!");
        console.log("Login failed");
      } else console.log(err.message);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    validation();
    loginWithEmail();
  };

  return (
    <form onSubmit={handleLoginSubmit} className={css.form}>
      <Input
        name="email"
        type="email"
        value={email}
        src={userIcon}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Input
        name="password"
        type="password"
        value={password}
        src={lockIcon}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <Button title="Login" type="submit" />
    </form>
  );
}
