import css from "./LoginScreen.module.css";
import Login from "./Login";
import SignInWithGoogle from "./SignUpWithGoogle";

export default function LoginScreen() {
  return (
    <>
      <h1 className={css.header}>Login</h1>
      <Login />
      <a href="#forgot" className={css.link}>
        Forgot password?
      </a>
      <p className={css.text}>Or login with</p>
      <SignInWithGoogle />
      <p className={`${css.text} ${css.position}`}>
        If you dont have acccount yet
      </p>
    </>
  );
}
