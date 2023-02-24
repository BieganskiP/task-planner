import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";
import { useState } from "react";
import css from "./WelcomeScreen.module.css";
export default function WelcomeScreen() {
  const [toggleState, settoggleState] = useState(true);
  const toggleChecked = () => settoggleState((toggleState) => !toggleState);

  return (
    <div className={css.container}>
      {toggleState && <LoginScreen />}
      {!toggleState && <SignUpScreen />}
      <button type="button" onClick={toggleChecked} className={css.button}>
        Click here
      </button>
    </div>
  );
}