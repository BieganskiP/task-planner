import css from "./Input.module.css";

export default function Input({ name, type, value, src }) {
  return (
    <label className={css.label} htmlFor={type}>
      {value}
      <input
        type={type}
        name={name}
        placeholder={value}
        className={css.input}
      ></input>
      <img src={src} alt={name} className={css.img}></img>
    </label>
  );
}
