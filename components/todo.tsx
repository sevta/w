import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ITodo = {
  text: string;
};

type Todos = {
  id: number;
  text: string;
};

export default function Homepage() {
  const { register, reset, setFocus, getValues, handleSubmit, setValue } =
    useForm<ITodo>();
  const [todos, setTodos] = useState<Todos[]>([]);
  const [editMode, setEditMode] = useState<Boolean>(false);
  const [indexUpdateTodo, setIndexUpdateTodo] = useState<any>(-1);
  const [prevTodos, setPrevTodos] = useState<Todos[]>([]);

  function onSubmit() {
    if (editMode) {
      let newTodos: Todos[] = [...todos];
      setPrevTodos((): Todos[] => [...newTodos]);
      newTodos[indexUpdateTodo].text = getValues("text");
      setTodos(newTodos);
      setEditMode(false);
      reset();
      setFocus("text");
      toast.success("success update todo");
    } else {
      let _current: Todos[] = [...todos];
      setPrevTodos((): Todos[] => [..._current]);

      setTodos((currentTodos): Todos[] => [
        ...currentTodos,
        {
          id: todos.length + 1,
          text: getValues("text"),
        },
      ]);
      reset();
      setFocus("text");
      toast.success("success add todo");
    }
  }

  function deleteTodo(index: number) {
    if (todos.length <= 0) return;
    let copyTodos: Todos[] = [...todos];
    setPrevTodos((): Todos[] => [...copyTodos]);
    copyTodos.splice(index, 1);
    setTodos(copyTodos);
    reset();
    setEditMode(false);
    toast.success("success delete todo");
  }

  function updateTodo(index: number) {
    let currentTodo = todos[index]?.text;
    setFocus("text");
    setEditMode(true);
    setIndexUpdateTodo(index);
    setValue("text", currentTodo);
  }

  function deleteAllTodos() {
    setTodos([]);
    toast.success("success delete todo");
  }

  function undoTodos() {
    console.log(prevTodos);
    setTodos(prevTodos);
  }

  useEffect(() => {
    if (!editMode) setValue("text", "");
  }, [editMode, setValue]);

  return (
    <div className="container">
      <div className="card ">
        <div className="card-body">
          <div className="card-title flex items-center justify-between">
            <div className="title">Todo App</div>
            {todos.length > 0 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  className="btn btn-xs btn-ghost px-3 font-medium"
                  onClick={deleteAllTodos}
                >
                  delete all
                </button>
                <button
                  className="btn btn-xs btn-ghost px-3 font-medium"
                  onClick={undoTodos}
                >
                  undo
                </button>
              </div>
            )}
          </div>
          <ul className="list-disc list-inside space-y-2 mt-4">
            {todos.length <= 0 && (
              <div
                className="italic font-medium text-gray-500 underline cursor-pointer relative"
                onClick={() => setFocus("text")}
              >
                Create new
              </div>
            )}
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-base-300 rounded-box px-5 py-2"
              >
                <div className="flex items-center justify-center space-x-3">
                  <span className="font-bold">{index + 1}</span>
                  <span className="text-sm font-medium">{todo?.text}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => deleteTodo(index)}
                  >
                    delete
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => updateTodo(index)}
                  >
                    edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mt-6">
              <input type="text" {...register("text", { required: true })} />
              {editMode ? (
                <>
                  <button className="btn btn-primary">update</button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => setEditMode(false)}
                  >
                    cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-secondary">save</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
