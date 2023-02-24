import css from "./Navigation.module.css";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export default function Navigation({ name }) {
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("user signed out");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={css.container}>
      <div>
        <h2>Welcome</h2>
        <h1>{name}</h1>
      </div>
      <div></div>
      <button onClick={logout}>Logout </button>
    </div>
  );
}
