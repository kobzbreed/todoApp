import { Router } from "express";
import {
  getAllTodos,
  createTodo,
  editTodo,
  getTodoById,
  deleteTodoById,
} from "../controller/todoController";

const router = Router();

router.get("/todos", getAllTodos);
router.delete("/todos/:id", deleteTodoById);
router.get("/todos/:id", getTodoById);

router.put("/todos/:id", editTodo);

router.post("/todos", createTodo);

export default router;
