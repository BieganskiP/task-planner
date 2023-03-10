import css from "./TaskContent.module.css";

export default function FilterButtons({ filter, setFilter }) {
  return (
    <div className={css.filterButtons}>
      <button
        onClick={() => setFilter("all")}
        className={filter === "all" ? css.active : ""}
      >
        All
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={filter === "completed" ? css.active : ""}
      >
        Completed
      </button>
      <button
        onClick={() => setFilter("notCompleted")}
        className={filter === "notCompleted" ? css.active : ""}
      >
        Not Completed
      </button>{" "}
    </div>
  );
}
