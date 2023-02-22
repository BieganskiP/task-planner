import css from "./LoginScreen.module.css";
import Login from "./Login";

export default function LoginScreen() {
  return (
    <div className={css.container}>
      <h1 className={css.header}>Login</h1>
      <Login />
      <a href="#forgot" className={css.link}>
        Forgot password?
      </a>
      <p className={css.text}>Or sign in with</p>

      <p className={`${css.text} ${css.position}`}>
        If you dont have acccount yet
      </p>
      <a href="#signUp" className={css.link}>
        Sign up here
      </a>
    </div>
  );
}
