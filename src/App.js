import WelcomeScreen from "./components/WelcomeScreen";
// import Test from "./components/getDataExample";

import css from "./components/App.module.css";

export default function App() {
  return (
    <div className={css.container}>
      {/* <Test /> */}
      <WelcomeScreen />
    </div>
  );
}
