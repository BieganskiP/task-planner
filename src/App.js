import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import css from "./components/App.module.css";

function App() {
  return (
    <div className={css.container}>
      <LoginScreen />
      <SignUpScreen />
    </div>
  );
}

export default App;
