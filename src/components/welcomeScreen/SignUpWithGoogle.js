import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
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

  return (
    <button onClick={signwithGoogle} className={css.button}>
      <img src={googleIcon} alt="Google Logo"></img>Google
    </button>
  );
}
