import css from "./SignUpScreen.module.css";

import SignUp from "./SignUp";
import SignInWithGoogle from "./SignUpWithGoogle";

export default function SignUpScreen() {
  return (
    <div className={css.container}>
      <h1 className={css.header}>Sing Up</h1>
      <SignUp />

      <p className={css.text}>Or sign up with</p>
      <SignInWithGoogle />
      <p className={`${css.text} ${css.position}`}>
        If you already have an account
      </p>
      <a href="#signUp" className={css.link}>
        Sign in here
      </a>
    </div>
  );
}
