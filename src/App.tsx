import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import styles from "./App.module.css";
import clipboard from "./assets/clipboard.svg";

import { ButtonLeadsToTop } from "./components/ButtonLeadsToTop";
import { Header } from "./components/Header";
import { TaskCard } from "./components/TaskCard";
import "./global.css";

const LOCAL_STORAGE_KEY = "@todo: tasks";

export interface ITask {
  id: string;
  content: string;
  isCompleted: Boolean;
}

export const localStorageKey = "@todo: tasks";

export const App = () => {
  const [tasks, setTasks] = useState<ITask[] | []>(
    localStorage.getItem(localStorageKey)
      ? JSON.parse(localStorage.getItem(localStorageKey) as string)
      : []
  );
  const [taskContentText, setTaskContentText] = useState("");
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault();

    setTasksAndSave([
      ...tasks,
      {
        id: uuid(),
        content: taskContentText,
        isCompleted: false,
      },
    ]);

    setTaskContentText("");
  };

  const handleNewTaskContentText = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity("");
    setTaskContentText(event.target.value);
  };

  const handleNewTaskContentInvalid = (
    event: InvalidEvent<HTMLInputElement>
  ) => {
    event.target.setCustomValidity("Digite uma nova tarefa para continuar!");
  };

  const showCompletedTaks = () => {
    return tasks.length > 0
      ? `${tasks.filter((task) => task.isCompleted).length} de ${tasks.length}`
      : "0";
  };

  const setTasksAndSave = (newTasks: ITask[]) => {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  };

  const deleteTaskById = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasksAndSave(newTasks);
  };

  const toggleTaskCompletedById = (taskId: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });

    setTasksAndSave(newTasks);
  };

  return (
    <div className="App">
      <Header />
      <form className={styles.form} onSubmit={handleCreateNewTask}>
        <input
          placeholder="Adicione uma nova tarefa"
          value={taskContentText}
          onChange={handleNewTaskContentText}
          onInvalid={handleNewTaskContentInvalid}
          autoFocus={taskContentText.length === 0}
          required
        />
        <button type="submit" disabled={taskContentText.length === 0}>
          Criar <AiOutlinePlusCircle />
        </button>
      </form>

      <div className={styles.container}>
        <header>
          <p>
            Tarefas criadas <span>{tasks.length}</span>
          </p>
          <p>
            Concluídas <span>{showCompletedTaks()}</span>
          </p>
        </header>

        <div className={styles.tasksContainer}>
          <div className={tasks.length !== 0 ? styles.hidden : styles.noTasks}>
            <img src={clipboard} />
            <div>
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>

          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={deleteTaskById}
              onClickCheckedTask={toggleTaskCompletedById}
            />
          ))}
        </div>
      </div>
      {scroll > 150 && <ButtonLeadsToTop />}
    </div>
  );
};
