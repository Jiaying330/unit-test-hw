import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoList from "./TodoList";

// TODO: Mock the fetch API, and do reset and clean up
beforeEach(() => {
  globalThis.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jset.resetAllMocks();
});

// TODO: Test component to render correctly with the fetched data
test("renders fetched todos on mount", async () => {
  const mockTodos = [
    { id: 1, title: "Todo 1", completed: false },
    { id: 2, title: "Todo 2", completed: false },
  ];
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });
  render(<TodoList />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });
});

// TODO: Test component to handle API fetch failure and display error message
test("handles API fetch failure", async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
  });
  render(<TodkList />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitFor(() => {
    expect(
      screen.getByText("Error: Failed to fetch todos")
    ).toBeInTheDocument();
  });
});

// TODO: Test adding a new todo
test("adds a new todo item", async () => {
  const mockTodos = [{ id: 1, title: "Todo 1", completed: false }];

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });

  render(<TodoList />);

  await waitFor(() => {
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
  });

  fireEvent.change(screen.getByPlaceholderText("Enter todo"), {
    target: { value: "New Todo" },
  });
  fireEvent.click(screen.getByText("Add Todo"));

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

// TODO: Test removing a todo
test("removes a todo item", async () => {
  const mockTodos = [{ id: 1, title: "Todo 1", completed: false }];

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });

  render(<TodoList />);

  await waitFor(() => {
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Remove"));

  expect(screen.queryByText("Todo 1")).not.toBeInTheDocument();
});
