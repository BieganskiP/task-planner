import { useState } from "react";
import css from "./index.module.css";

import SignUpScreen from "./signUp/SignUpScreen";
import LoginScreen from "./login/LoginScreen";

export default function WelcomeScreen() {
  const [toggleState, settoggleState] = useState(true);
  const toggleChecked = () => settoggleState((toggleState) => !toggleState);

  return (
    <div className={css.container}>
      {toggleState && <LoginScreen />}
      {!toggleState && <SignUpScreen />}
      <a onClick={toggleChecked} className={css.button} href="#switch">
        Click here
      </a>
    </div>
  );
}
