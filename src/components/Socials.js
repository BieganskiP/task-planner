import css from "./Socials.module.css";
import icons from "./social.json";

export default function Socials() {
  return (
    <ul className={css.social}>
      {icons.icons.map((icon) => (
        <li className={css.icon} key={icon.id}>
          <img src={icon.src} alt={icon.alt}></img>
        </li>
      ))}
    </ul>
  );
}
