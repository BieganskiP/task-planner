import React from "react";
import css from "./TaskContent.module.css";

export default function AddTaskForm({
  taskInput,
  setTaskInput,
  dateInput,
  setDateInput,
  handleTaskSubmit,
  dateError,
  setDateError,
}) {
  const handleDateInputChange = (e) => {
    setDateInput(e.target.value);
    setDateError(false);
  };

  const handleNoDateCheckboxChange = (e) => {
    setDateInput("");
    setDateError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dateInput && !e.target[2].checked) {
      setDateError(true);
    } else {
      handleTaskSubmit(e);
      setTaskInput("");
      setDateInput("");
      setDateError(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.addTask}>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add task"
      />
      <input type="date" value={dateInput} onChange={handleDateInputChange} />
      <label htmlFor="no-date-checkbox">
        task without date
        <input
          type="checkbox"
          id="no-date-checkbox"
          onChange={handleNoDateCheckboxChange}
        />
      </label>
      <button>Add Task</button>
      {dateError && (
        <p style={{ color: "red" }}>
          Please select a date or check the "task without date" box.
        </p>
      )}
    </form>
  );
}
