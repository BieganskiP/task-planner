// import React, { useState, useEffect } from "react";
// import {
//   doc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
//   onSnapshot,
// } from "firebase/firestore";
// import { auth, db } from "../../config/firebase";
// import css from "./TaskContent.module.css";

// export default function TasksContent() {
//   const [taskInput, setTaskInput] = useState("");
//   const [dateInput, setDateInput] = useState("");
//   const [dateError, setDateError] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [displayedTasks, setDisplayedTasks] = useState([]);
//   const [showAll, setShowAll] = useState(true);
//   const [showCompleted, setShowCompleted] = useState(false);
//   const [showNotCompleted, setShowNotCompleted] = useState(false);
//   const currentUser = auth.currentUser;

//   useEffect(() => {
//     const userRef = doc(db, currentUser.uid, currentUser.email);
//     const unsubscribe = onSnapshot(userRef, (doc) => {
//       if (doc.exists()) {
//         setTasks(doc.data().tasks || []);
//       }
//     });
//     return unsubscribe;
//   }, [currentUser]);

//   useEffect(() => {
//     if (showAll) {
//       setDisplayedTasks(tasks);
//     } else if (showCompleted) {
//       setDisplayedTasks(tasks.filter((task) => task.completed));
//     } else if (showNotCompleted) {
//       setDisplayedTasks(tasks.filter((task) => !task.completed));
//     }
//   }, [showAll, showCompleted, showNotCompleted, tasks]);

//   const handleTaskSubmit = async (e) => {
//     e.preventDefault();
//     if (taskInput) {
//       if (!dateInput && !document.getElementById("no-date-checkbox").checked) {
//         setDateError(true);
//         return;
//       }
//       const userRef = doc(db, currentUser.uid, currentUser.email);
//       await updateDoc(userRef, {
//         tasks: arrayUnion({
//           task: taskInput,
//           date: dateInput,
//           completed: false,
//         }),
//       });
//       setTaskInput("");
//       setDateInput("");
//       setDateError(false);
//     }
//   };

//   const handleTaskDelete = async (taskId) => {
//     const userRef = doc(db, currentUser.uid, currentUser.email);
//     await updateDoc(userRef, {
//       tasks: arrayRemove(taskId),
//     });
//   };

//   const handleTaskCompleted = async (task) => {
//     const userRef = doc(db, currentUser.uid, currentUser.email);
//     const taskIndex = tasks.findIndex((t) => t.task === task.task);
//     const updatedTasks = [...tasks];
//     updatedTasks[taskIndex] = { ...task, completed: !task.completed };
//     await updateDoc(userRef, {
//       tasks: updatedTasks,
//     });
//   };

//   return (
//     <div>
//       <form onSubmit={handleTaskSubmit}>
//         <input
//           type="text"
//           value={taskInput}
//           onChange={(e) => setTaskInput(e.target.value)}
//         />
//         <input
//           type="date"
//           value={dateInput}
//           onChange={(e) => setDateInput(e.target.value)}
//         />
//         <label>
//           task without date
//           <input type="checkbox" id="no-date-checkbox"></input>
//         </label>
//         <button>Add Task</button>
//         {dateError && (
//           <p style={{ color: "red" }}>
//             Please select a date or check the "task without date" box.
//           </p>
//         )}
//       </form>
//       <div className={css.filterButtons}>
//         <button onClick={() => setShowAll(true)}>All</button>
//         <button onClick={() => setShowCompleted(true)}>Completed</button>
//         <button onClick={() => setShowNotCompleted(true)}>Not Completed</button>
//       </div>
//       <ul>
//         {displayedTasks.map((task) => (
//           <li key={task.task}>
//             <input
//               type="checkbox"
//               checked={task.completed}
//               onChange={() => handleTaskCompleted(task)}
//             />
//             <span className={task.completed ? css.completed : ""}>
//               {task.task}
//             </span>
//             {task.date && <span>{task.date}</span>}
//             <button onClick={() => handleTaskDelete(task)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import css from "./TaskContent.module.css";

const TasksContent = () => {
  const [taskInput, setTaskInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [dateError, setDateError] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const currentUser = auth.currentUser;

  useEffect(() => {
    const userRef = doc(db, currentUser.uid, currentUser.email);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setTasks(doc.data().tasks || []);
      }
    });
    return unsubscribe;
  }, [currentUser]);

  useEffect(() => {
    switch (filter) {
      case "all":
        setDisplayedTasks(tasks);
        break;
      case "completed":
        setDisplayedTasks(tasks.filter((task) => task.completed));
        break;
      case "notCompleted":
        setDisplayedTasks(tasks.filter((task) => !task.completed));
        break;
      default:
        setDisplayedTasks(tasks);
    }
  }, [filter, tasks]);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!taskInput) return;
    if (!dateInput && !document.getElementById("no-date-checkbox").checked) {
      setDateError(true);
      return;
    }
    const userRef = doc(db, currentUser.uid, currentUser.email);
    await updateDoc(userRef, {
      tasks: arrayUnion({
        task: taskInput,
        date: dateInput,
        completed: false,
      }),
    });
    setTaskInput("");
    setDateInput("");
    setDateError(false);
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

  return (
    <div>
      <ul>
        {displayedTasks.map((task) => (
          <li key={task.task}>
            <span
              className={`${css.taskName} ${
                task.completed ? css.completedTask : ""
              }`}
              onClick={() => handleTaskCompleted(task)}
            >
              {task.task}
            </span>
            <span className={css.taskDate}>{task.date}</span>
            <button onClick={() => handleTaskDelete(task)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
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
      </form>
      <div className={css.filterButtons}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("notCompleted")}>
          Not Completed
        </button>{" "}
      </div>
    </div>
  );
};

export default TasksContent;
