import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { ITask } from "../../App";

import styles from "./TaskCard.module.css";

interface ITaskProps {
  task: ITask;
  onDeleteTask: (taskId: string) => void;
  onClickCheckedTask: (taskId: string) => void;
}

export const TaskCard: React.FC<ITaskProps> = ({
  task,
  onDeleteTask,
  onClickCheckedTask,
}) => {
  return (
    <div className={styles.task}>
      <button
        id={task.id}
        name={task.id}
        className={styles.checkContainer}
        onClick={() => {
          onClickCheckedTask(task.id);
        }}
      >
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <label htmlFor={task.id}>
        <p className={task.isCompleted ? styles.taskText : undefined}>
          {task.content}
        </p>
      </label>

      <button
        className={styles.deleteButton}
        onClick={() => onDeleteTask(task.id)}
      >
        <TbTrash size={20} />
      </button>
    </div>
  );
};
