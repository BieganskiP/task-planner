import WelcomeScreen from "./components/WelcomeScreen";
import Profile from "./components/Profile";
import { auth } from "./config/firebase";
import css from "./components/App.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export default function App() {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const logout = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        setUserID(null);
      }
    });
    return () => logout();
  }, []);

  return (
    <div className={css.container}>
      {userID ? <Profile name={userID} /> : <WelcomeScreen />}
    </div>
  );
}
