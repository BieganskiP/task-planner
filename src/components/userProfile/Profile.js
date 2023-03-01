import React, { useState } from "react";
import css from "./Profile.module.css";
import Navigation from "./Navigation";
import ProfileSection from "./ProfileSection";
import TasksContent from "./TaskContent";
import SettingsContent from "./SettingsContent";
import CalendarContent from "./CalendarContent";

export default function Profile() {
  const [section, setSection] = useState("tasks");
  const contentMap = {
    tasks: <TasksContent />,
    calendar: <CalendarContent />,
    settings: <SettingsContent />,
  };

  return (
    <div className={css.container}>
      <Navigation section={setSection} />
      <ProfileSection>{contentMap[section]}</ProfileSection>
    </div>
  );
}
