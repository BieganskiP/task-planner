import css from "./SignUpScreen.module.css";
import SignUp from "./SignUp";
import SignInWithGoogle from "./SignUpWithGoogle";

export default function SignUpScreen() {
  return (
    <>
      <h1 className={css.header}>Sing Up</h1>
      <SignUp />

      <p className={css.text}>Or sign up with</p>
      <SignInWithGoogle />
      <p className={`${css.text} ${css.position}`}>
        If you already have an account
      </p>
    </>
  );
}
