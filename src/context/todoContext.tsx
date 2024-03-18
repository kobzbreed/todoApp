import React, { createContext, useState, useEffect, ReactNode } from "react";

import axios from "axios";

const TodoContext = createContext({
  todos: [] as Todo[],
  fetchTodos: () => {},
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
});

interface TodoContextProps {
  children: ReactNode;
}

interface Todo {
  _id: string;
  text: string;
}

const todoProvider = ({ children }: TodoContextProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos from server:", error);
    }
  };
  const addTodo = async (text: string) => {
    try {
      const response = await axios.post<Todo>("http://localhost:8080/todos", {
        text,
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id: string, newText: string) => {
    try {
      const response = await axios.put<Todo>(
        `http://localhost:8080/todos/${id}`,
        { text: newText }
      );
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, text: newText } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, fetchTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, todoProvider };
