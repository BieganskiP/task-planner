import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";
import { useState } from "react";
import css from "./WelcomeScreen.module.css";
export default function WelcomeScreen() {
  const [toggle, setToggle] = useState(true);
  const toggleChecked = () => setToggle((toggle) => !toggle);

  return (
    <div className={css.container}>
      {toggle && <LoginScreen />}
      {!toggle && <SignUpScreen />}
      <button type="button" onClick={toggleChecked} className={css.button}>
        Click here
      </button>
    </div>
  );
}
