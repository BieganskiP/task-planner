import React, { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import css from "./TaskContent.module.css";

export default function TasksContent() {
  const [taskInput, setTaskInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [dateError, setDateError] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = auth.currentUser;

  useEffect(() => {
    const userRef = doc(db, currentUser.uid, currentUser.email);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setTasks(doc.data().tasks || []);
      } else {
        setDoc(
          userRef,
          {
            userEmail: currentUser.email,
            userId: currentUser.uid,
            tasks: [],
          },
          { merge: true }
        )
          .then(() => console.log("Document created"))
          .catch((error) => console.error("Error creating document: ", error));
      }
    });
    return unsubscribe;
  }, [currentUser]);

  useEffect(() => {
    let sortedTasks = [...tasks];
    sortedTasks = [
      ...sortedTasks.filter((task) => !task.date),
      ...sortedTasks.filter((task) => task.date),
    ];
    sortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    switch (filter) {
      case "all":
        setDisplayedTasks(sortedTasks);
        break;
      case "completed":
        setDisplayedTasks(sortedTasks.filter((task) => task.completed));
        break;
      case "notCompleted":
        setDisplayedTasks(sortedTasks.filter((task) => !task.completed));
        break;
      default:
        setDisplayedTasks(sortedTasks);
    }
  }, [filter, tasks]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filteredTasks = tasks.filter(
      (task) => task.task.toLowerCase().indexOf(query) !== -1
    );
    setDisplayedTasks(filteredTasks);
  }, [searchQuery, tasks]);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!taskInput) return;
    if (document.getElementById("no-date-checkbox").checked) {
      setDateInput("");
    } else if (!dateInput) {
      setDateError(true);
      return;
    }
    let taskData = { task: taskInput, completed: false };
    if (dateInput && !document.getElementById("no-date-checkbox").checked) {
      taskData.date = dateInput;
    }
    const userRef = doc(db, currentUser.uid, currentUser.email);
    await updateDoc(userRef, {
      tasks: arrayUnion(taskData),
    });
    setTaskInput("");
    setDateInput("");
    setDateError(false);
    document.getElementById("no-date-checkbox").checked = false;
  };

  const handleTaskDelete = async (task) => {
    const userRef = doc(db, currentUser.uid, currentUser.email);
    await updateDoc(userRef, {
      tasks: arrayRemove(task),
    });
  };

  const handleTaskCompleted = async (task) => {
    const userRef = doc(db, currentUser.uid, currentUser.email);
    const taskIndex = tasks.findIndex((t) => t.task === task.task);
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = { ...task, completed: !task.completed };
    await updateDoc(userRef, {
      tasks: updatedTasks,
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={css.taskSection}>
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
      <div className={css.controls}>
        <form onSubmit={handleTaskSubmit} className={css.addTask}>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add task"
          />
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <label>
            task without date
            <input type="checkbox" id="no-date-checkbox"></input>
          </label>
          <button>Add Task</button>
          {dateError && (
            <p style={{ color: "red" }}>
              Please select a date or check the "task without date" box.
            </p>
          )}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search task"
          />
        </form>
        <div className={css.filterButtons}>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("notCompleted")}>
            Not Completed
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
