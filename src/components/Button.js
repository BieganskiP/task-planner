import css from "./Button.module.css";

export default function Button({ title, type }) {
  return (
    <button className={css.button} type="">
      {title}
    </button>
  );
}
