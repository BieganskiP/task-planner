import css from "./Button.module.css";

export default function Button({ title, type }) {
  return (
    <button className={`${css.button} ${css.position}`} type={type}>
      {title}
    </button>
  );
}
