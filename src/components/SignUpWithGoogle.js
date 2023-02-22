import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import googleIcon from "../icons/google.svg";
import css from "./SignUpWithGoogle.module.css";

export default function SignInWithGoogle() {
  const signwithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={signwithGoogle} className={css.button}>
        <img src={googleIcon} alt="Google Logo"></img>Google
      </button>
      <button onClick={logout}>logout</button>
    </div>
  );
}
