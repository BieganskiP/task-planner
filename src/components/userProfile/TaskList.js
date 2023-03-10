import React from "react";
import css from "./TaskContent.module.css";

export default function TaskList({
  displayedTasks,
  handleTaskCompleted,
  handleTaskDelete,
}) {
  return (
    <ul className={css.taskList}>
      {displayedTasks.map((task) => (
        <li
          key={task.task}
          className={`${css.task} ${
            task.completed ? css.completed : css.notCompleted
          }`}
        >
          <label className={css.taskName}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskCompleted(task)}
            />
            <span className={task.completed ? css.completedTask : ""}>
              {task.task}
            </span>
          </label>
          <span className={css.taskDate}>{task.date}</span>
          <button
            onClick={() => handleTaskDelete(task)}
            className={css.taskDeleteBtn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
