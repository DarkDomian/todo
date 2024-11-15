import { render, fireEvent, screen, act, renderHook } from "@testing-library/react";
import useTaskManager from "./TaskManager";

// Mock localStorage
beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn();
  global.Storage.prototype.getItem = jest.fn();
  global.Storage.prototype.removeItem = jest.fn();
});

describe("useTaskManager", () => {
  it("should add a task", () => {
    // Mock initial state for localStorage
    localStorage.setItem("tasklist", JSON.stringify({}));

    const { result } = renderHook(() => useTaskManager());

    // Add a new task
    act(() => {
      result.current.addTask("New task");
    });

    // Check that the task has been added
    expect(result.current.taskList).toHaveLength(1);
    expect(result.current.taskList[0].text).toBe("New task");
  });

  it("should remove completed tasks", () => {
    const { result } = renderHook(() => useTaskManager());

    // Add tasks
    act(() => {
      result.current.addTask("Task 1");
      result.current.addTask("Task 2");
    });

    // Mark one task as completed
    act(() => {
      result.current.toggleCompletedTasks(1);
    });

    // Remove completed tasks
    act(() => {
      result.current.removeCompletedTasks();
    });

    // Check that only one task remains
    expect(result.current.taskList).toHaveLength(1);
    expect(result.current.taskList[0].text).toBe("Task 2");
  });

  it("should toggle task completion status", () => {
    const { result } = renderHook(() => useTaskManager());

    // Add a task
    act(() => {
      result.current.addTask("Task 1");
    });

    // Check initial status (not completed)
    expect(result.current.taskList[0].completed).toBe(false);

    // Toggle task completion status
    act(() => {
      result.current.toggleCompletedTasks(1);
    });

    // Check that the status has changed (completed)
    expect(result.current.taskList[0].completed).toBe(true);
  });

  it("should load tasks from localStorage", () => {
    const mockData = {
      1: { text: "Task 1", completed: false },
    };

    // Mock localStorage
    localStorage.setItem("tasklist", JSON.stringify(mockData));

    const { result } = renderHook(() => useTaskManager());

    // Check that the task has been loaded
    expect(result.current.taskList).toHaveLength(1);
    expect(result.current.taskList[0].text).toBe("Task 1");
  });

  it("should save tasks to localStorage", () => {
    const { result } = renderHook(() => useTaskManager());

    // Add a task
    act(() => {
      result.current.addTask("Task 1");
    });

    // Check that the data is saved in localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "tasklist",
      JSON.stringify({
        1: { text: "Task 1", completed: false },
      })
    );
  });
});
