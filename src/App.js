import LoginScreen from "./components/LoginScreen";
// import Login from "./components/Login";
// import Logo from "./components/Logo";
import css from "./components/App.module.css";

function App() {
  return (
    <div className={css.container}>
      <LoginScreen />
    </div>
  );
}

export default App;
