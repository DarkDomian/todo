import { useState, useEffect, useCallback } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const useTaskManager = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  // local storage updete after changing
  const updateLocalStorage = useCallback(() => {
    const normalizedTasks: Record<number, Omit<Task, "id">> = {};
    taskList.forEach((task, index) => {
      normalizedTasks[index + 1] = {
        text: task.text,
        completed: task.completed,
      };
    });

    localStorage.setItem("tasklist", JSON.stringify(normalizedTasks));
  }, [taskList]);

  // New task adding
  const addTask = (text: string) => {
    const newTask: Task = {
      id: taskList.length + 1,
      text,
      completed: false,
    };
    setTaskList((prev) => [...prev, newTask]);
  };

  // clear complited task
  const removeCompletedTasks = () => {
    const remainingTasks = taskList.filter((task) => !task.completed);
    setTaskList(remainingTasks);
  };

  // switch the task status
  const toggleCompletedTasks = (value: number | number[]) => {
    const values = Array.isArray(value) ? value : [value];
    const updatedTaskList = taskList.map((task) =>
      values.includes(task.id) ? { ...task, completed: !task.completed } : task
    );

    setTaskList(updatedTaskList);
  };

  // refresh task list by using localStorage
  const loadTasks = useCallback(() => {
    const storedData = localStorage.getItem("tasklist");
    if (storedData) {
      try {
        const parsedData: Record<number, Omit<Task, "id">> = JSON.parse(
          storedData
        );
        const tasks: Task[] = Object.entries(parsedData).map(([id, info]) => ({
          id: Number(id),
          text: info.text,
          completed: info.completed,
        }));

        setTaskList(tasks);
      } catch (error) {
        console.error("Somthing went wtong: ", error);
      }
    }
  }, []);


  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  useEffect(() => {
    if (isFirstRender) {
        loadTasks();
        setIsFirstRender(false);
    } else {
        updateLocalStorage()
    }
  }, [taskList, updateLocalStorage, loadTasks, isFirstRender]);

  return {
    taskList,
    addTask,
    removeCompletedTasks,
    toggleCompletedTasks,
  };
};

export default useTaskManager;
