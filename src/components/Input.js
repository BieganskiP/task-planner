import css from "./Input.module.css";

export default function Input({ name, type, src }) {
  return (
    <label className={css.label} htmlFor={type}>
      {name}
      <input
        type={type}
        name={name}
        placeholder={name}
        className={css.input}
      ></input>
      <img src={src} alt={name} className={css.img}></img>
    </label>
  );
}
