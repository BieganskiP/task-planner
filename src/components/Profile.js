import css from "./Profile.module.css";

import Navigation from "./Navigation";

export default function Profile({ name }) {
  return (
    <div className={css.container}>
      <Navigation name={name} />
    </div>
  );
}
