import React, { useState, useEffect } from "react";
import css from "./CalendarContent.module.css";
import { db, auth } from "../../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function CalendarContent() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [tasks, setTasks] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;
    const userRef = doc(db, currentUser.uid, currentUser.email);
    const unsubscribe = onSnapshot(
      userRef,
      (doc) => {
        if (doc.exists()) {
          setTasks(doc.data().tasks || []);
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.log("Error fetching document:", error);
      }
    );
    return unsubscribe;
  }, [currentUser]);

  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const handlePrevMonth = () => {
    setMonth(month === 1 ? 12 : month - 1);
    setYear(month === 1 ? year - 1 : year);
  };

  const handleNextMonth = () => {
    setMonth(month === 12 ? 1 : month + 1);
    setYear(month === 12 ? year + 1 : year);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    const tasksForDay = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      const taskYear = taskDate.getFullYear();
      const taskMonth = taskDate.getMonth() + 1;
      const taskDay = taskDate.getDate();
      return taskYear === year && taskMonth === month && taskDay === day;
    });
    setSelectedTasks(tasksForDay);
  };

  const renderTasksForToday = () => {
    if (selectedTasks.length > 0) {
      return selectedTasks.map((task, index) => (
        <div key={index}>
          <p>{task.task}</p>
        </div>
      ));
    } else {
      return <p>There are no tasks for today</p>;
    }
  };
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = getFirstDayOfMonth(month, year);

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const tasksForDay = tasks.filter((task) => {
        const taskDate = new Date(task.date);
        const taskYear = taskDate.getFullYear();
        const taskMonth = taskDate.getMonth() + 1;
        const taskDay = taskDate.getDate();
        return taskYear === year && taskMonth === month && taskDay === i;
      });
      days.push(
        <div
          key={i}
          className={`${css.day} ${
            tasksForDay.length > 0 ? css.withTasks : ""
          }`}
          onClick={() => handleDayClick(i)}
        >
          {i}
          {tasksForDay.length > 0 && (
            <div className={css.taskCount}>{tasksForDay.length}</div>
          )}
        </div>
      );
    }

    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
      <div key={i} className={css.blank}></div>
    ));

    const selectedDayTasks = renderTasksForToday();

    return (
      <div className={css.calendar}>
        <div className={css.month}>
          <div className={css.monthHeader}>
            <button onClick={handlePrevMonth}>{"<"}</button>
            <h1>
              {monthName()} {year}
            </h1>
            <button onClick={handleNextMonth}>{">"}</button>
          </div>
        </div>
        <div className={css.days}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className={css.dayName}>
              {day}
            </div>
          ))}
          {blanks}
          {days}
        </div>
        {selectedDay && (
          <div className={css.selectedDay}>
            <h2>
              {monthName()} {selectedDay}, {year}
            </h2>
            {selectedDayTasks}
          </div>
        )}
      </div>
    );
  };

  const monthName = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1];
  };

  return <div>{renderCalendar()}</div>;
}

// const renderCalendar = () => {
//   const daysInMonth = getDaysInMonth(month, year);
//   const firstDayOfMonth = getFirstDayOfMonth(month, year);

//   const days = [];
//   for (let i = 1; i <= daysInMonth; i++) {
//     const tasksForDay = tasks.filter((task) => {
//       const taskDate = new Date(task.date);
//       const taskYear = taskDate.getFullYear();
//       const taskMonth = taskDate.getMonth() + 1;
//       const taskDay = taskDate.getDate();
//       return taskYear === year && taskMonth === month && taskDay === i;
//     });
//     days.push(
//       <div
//         key={i}
//         className={`${css.day} ${
//           tasksForDay.length > 0 ? css.withTasks : ""
//         }`}
//         onClick={() => handleDayClick(i)}
//       >
//         {i}
//       </div>
//     );
//   }

//   const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
//     <div key={i} className={css.blank}></div>
//   ));

//   const selectedDayTasks = renderTasksForToday();

//   return (
//     <div className={css.calendar}>
//       <div className={css.month}>
//         <div className={css.monthHeader}>
//           <button onClick={handlePrevMonth}>{"<"}</button>
//           <h1>
//             {monthName()} {year}
//           </h1>
//           <button onClick={handleNextMonth}>{">"}</button>
//         </div>
//       </div>
//       <div className={css.days}>
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//           <div key={day} className={css.dayName}>
//             {day}
//           </div>
//         ))}
//         {blanks}
//         {days}
//       </div>
//       {selectedDay && (
//         <div className={css.selectedDay}>
//           <h2>
//             {monthName()} {selectedDay}, {year}
//           </h2>
//           {selectedDayTasks}
//         </div>
//       )}
//     </div>
//   );
// };
