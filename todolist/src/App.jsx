import { useState, useEffect } from "react";
import "./App.css";

function Input({ placeholder, onChange, className, value, type, onKeyDown }) {
  return (
    <>
      <input
        type={type}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={value}
        className={className}
      />
    </>
  );
}

function App() {
  const [todo, setToDo] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedTodo = localStorage.getItem("todoList");
    if (storedTodo) {
      setToDo(JSON.parse(storedTodo));
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("todoList", JSON.stringify(todo));
    }
  }, [todo, loaded]);

  const enter = (e) => {
    if (e.key === "Enter") {
      savedInput();
    }
  };
  const change = (e) => {
    setInput(e.target.value);
  };

  const savedInput = () => {
    if (input.trim() === "") {
      setError("Enter a task.");
      return;
    }
    setToDo([...todo, { input }]);
    setInput("");
    setError("");
  };

  return (
    <>
      <h1 className="mb-5">To-Do List</h1>
      <Input
        type="text"
        placeholder="Add ToDo"
        value={input}
        onChange={change}
        onKeyDown={enter}
        className="border-2 p-4 rounded-xl bg-white text-black font-semibold mb-8"
      />
      <button
        onClick={savedInput}
        className="ml-10 bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
      >
        Click Me
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {todo.map((value, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          <p className="flex-1 bg-gray-900 pl-6 p-2 rounded-2xl hover:bg-gray-500">
            {value.input}
          </p>
          <button
            className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-800"
            onClick={() => {
              const newTodos = todo.filter((_, i) => i !== index);
              setToDo(newTodos);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
