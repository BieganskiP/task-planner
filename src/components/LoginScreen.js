import css from "./LoginScreen.module.css";
import Login from "./Login";


export default function WelcomeScreen() {
  return (
    <div className={css.container}>
      <h1 className={css.header}>Login</h1>
      <Login />
      
    </div>
  );
}
