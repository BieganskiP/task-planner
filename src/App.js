import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";

import css from "./components/App.module.css";

export default function App() {
  return (
    <div className={css.container}>
      <LoginScreen />
      <SignUpScreen />
    </div>
  );
}
