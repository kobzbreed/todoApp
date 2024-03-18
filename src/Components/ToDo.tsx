import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

function ToDo({ text, updateMode, deleteToDo }) {
  return (
    <div className="mt-4">
      <div className="todo bg-black text-white p-3 flex justify-between items-center mb-4">
        <div className="text">{text}</div>
        <div className="icons flex items-center space-x-2">
          <BiEdit
            className="icon text-xl cursor-pointer"
            onClick={updateMode}
          />
          <AiFillDelete
            className="icon text-xl cursor-pointer"
            onClick={deleteToDo}
          />
        </div>
      </div>
    </div>
  );
}

export default ToDo;
