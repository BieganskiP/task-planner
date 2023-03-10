import React from "react";
import css from "./TaskContent.module.css";

export default function SearchTaskInput({ searchQuery, handleSearch }) {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearch}
      placeholder="Search task"
      className={css.searchInput}
    />
  );
}
