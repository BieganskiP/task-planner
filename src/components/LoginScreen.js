import css from "./LoginScreen.module.css";
import Login from "./Login";
import Button from "./Button";

export default function WelcomeScreen() {
  return (
    <div className={css.container}>
      <h1 className={css.header}>Login</h1>
      <Login />
      <Button title="Login" type="submit" />
    </div>
  );
}
