import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  text: string;
}

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
});

const TodoModel = mongoose.model<ITodo>("Tdod", todoSchema);

export default TodoModel;
