import Input from "./Input";
import Validate from "./Validate";
import css from "./Login.module.css";

import userIcon from "../icons/user.svg";
import lockIcon from "../icons/lock.svg";

export default function Login() {
  return (
    <form action="submit" className={css.form}>
      <Input
        name="email"
        type="email"
        value={Validate.state.email}
        src={userIcon}
      />
      <Input
        name="password"
        type="password"
        value={Validate.state.email}
        src={lockIcon}
      />
    </form>
  );
}
