import { Request, Response } from "express";
import TodoModel, { ITodo } from "../models/todoModel";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos: ITodo[] = await TodoModel.find();

    if (todos.length === 0) {
      return res.json([]);
    }
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    const newTodo: ITodo = new TodoModel({ text });
    await newTodo.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const editTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const todo = await TodoModel.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.text = text;

    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todo = await TodoModel.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
};
