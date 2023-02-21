import { useState } from "react";
import Input from "./Input";
import css from "./Login.module.css";
import userIcon from "../icons/user.svg";
import lockIcon from "../icons/lock.svg";
import Button from "./Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
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

  return (
    <form onSubmit={handleSubmit} className={css.form}>
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
