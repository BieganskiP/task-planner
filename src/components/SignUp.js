import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import css from "./SignUp.module.css";
import userIcon from "../icons/user.svg";
import lockIcon from "../icons/lock.svg";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState({});

  const signIn = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const handleSubmit = async () => {
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
  const wrapperFunction = (e) => {
    e.preventDefault();
    handleSubmit();
    signIn();
  };
  return (
    <form onSubmit={wrapperFunction} className={css.form}>
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

      <Button title="Sign Up" type="submit" />
    </form>
  );
}
