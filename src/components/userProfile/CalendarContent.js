import React, { useState, useEffect } from "react";
import css from "./CalendarContent.module.css";
import { db, auth } from "../../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function CalendarContent() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [tasks, setTasks] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
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
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    // handle day click here
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
        </div>
      );
    }

    const blanks = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<div key={i * 100} className={css.blank}></div>);
    }

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
