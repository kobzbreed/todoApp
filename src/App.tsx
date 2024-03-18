import { useEffect, useState } from "react";
import "./index.css";
import ToDo from "./Components/ToDo";
import {
  getAllToDo,
  addToDo,
  updateToDo,
  deleteToDo,
} from "./utils/HandleApis";
import { ToDoItem } from "./utils/HandleApis";
function App() {
  const [toDo, setToDo] = useState<ToDoItem[]>([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todos = await getAllToDo();
      setToDo(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddToDo = async () => {
    try {
      await addToDo(text);
      setText("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleUpdateToDo = async () => {
    try {
      await updateToDo(todoId, text);
      setText("");
      setIsUpdating(false);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteToDo = async (todoId: string) => {
    try {
      await deleteToDo(todoId);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateMode = (_id: string, text: string) => {
    setIsUpdating(true);
    setText(text);
    setTodoId(_id);
  };

  return (
    <div className="flex justify-center items-center mt-36">
      <div className="container text-center mx-auto">
        <h1 className="text-4xl font-bold">ToDo App</h1>

        <div className="top mt-4 flex items-center justify-center">
          <input
            className="border-b-2 border-gray-400 focus:border-blue-500 outline-none px-2 py-1 flex-grow"
            type="text"
            placeholder="Add ToDos.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-600 transition duration-300 cursor-pointer"
            onClick={isUpdating ? handleUpdateToDo : handleAddToDo}
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => handleDeleteToDo(item._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
