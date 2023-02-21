import css from "./LoginScreen.module.css";
import Login from "./Login";
import Socials from "./Socials";

export default function WelcomeScreen() {
  return (
    <div className={css.container}>
      <h1 className={css.header}>Login</h1>
      <Login />
      <a href="#forgot" className={css.forgot}>
        Forgot password?
      </a>
      <Socials />
    </div>
  );
}
