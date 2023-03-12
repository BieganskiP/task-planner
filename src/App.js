import WelcomeScreen from "./components/loginScreen";
import Profile from "./components/userProfile/Profile";
import { auth } from "./config/firebase";
import css from "./App.module.css";
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
      {userID ? <Profile /> : <WelcomeScreen />}
    </div>
  );
}
