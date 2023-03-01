import React from "react";
import css from "./Navigation.module.css";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import calendar from "../icons/calendar.svg";
import cog from "../icons/cog.svg";
import clipboard from "../icons/clipboard.svg";
import exit from "../icons/exit.svg";

export default function Navigation({ section }) {
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
        <button
          type="button"
          className={css.button}
          onClick={() => section("tasks")}
        >
          <img src={clipboard} alt="clipboard icon" />
          <span className={css.buttonText}>Tasks</span>
        </button>
        <button
          type="button"
          className={css.button}
          onClick={() => section("calendar")}
        >
          <img src={calendar} alt="calendar icon" />
          <span className={css.buttonText}>Calendar</span>
        </button>
      </div>

      <div className={css.section}>
        <button
          type="button"
          className={css.button}
          onClick={() => section("settings")}
        >
          <img src={cog} alt="settings icon" />
          <span className={css.buttonText}>Settings</span>
        </button>
        <button onClick={logout} className={css.button}>
          <img src={exit} alt="exits icon" />
          <span className={css.buttonText}>Logout</span>
        </button>
      </div>
    </div>
  );
}
