import css from "./Navigation.module.css";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import calendar from "../icons/calendar.svg";
import cog from "../icons/cog.svg";
import clipboard from "../icons/clipboard.svg";
import exit from "../icons/exit.svg";

export default function Navigation() {
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
      <h1 className={css.header}>TASK PLANNER</h1>
      <div className={css.section}>
        <button type="button" className={css.button}>
          <img src={clipboard} alt="clipboard icon" />
          Tasks
        </button>
        <button type="button" className={css.button}>
          <img src={calendar} alt="calendar icon" />
          Calendar
        </button>
      </div>

      <div className={css.section}>
        <button type="button" className={css.button}>
          <img src={cog} alt="settings icon" />
          Settings
        </button>
        <button onClick={logout} className={css.button}>
          <img src={exit} alt="exits icon" />
          Logout{" "}
        </button>
      </div>
    </div>
  );
}
