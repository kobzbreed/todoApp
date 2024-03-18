import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://todo-server-1-active-server.onrender.com/todos"
    : "http://localhost:8080/todos";

export interface ToDoItem {
  _id: string;
  text: string;
}

const getAllToDo = async (): Promise<ToDoItem[]> => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

const addToDo = async (text: string): Promise<void> => {
  try {
    await axios.post(baseUrl, { text });
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

const updateToDo = async (todoId: string, text: string): Promise<void> => {
  try {
    await axios.put(`${baseUrl}/${todoId}`, { text });
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

const deleteToDo = async (todoId: string): Promise<void> => {
  try {
    await axios.delete(`${baseUrl}/${todoId}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
