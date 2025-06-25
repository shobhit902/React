import { useState } from "react";
import "./App.css";

function ButtonComponent({ label, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
      >
        {label}
      </button>
    </>
  );
}

function App() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <>
      <div
        className={`w-full h-full min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
          toggle ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">Day 3</h1>
        <p className="mb-4">Theme: {toggle ? "Dark" : "Light"}</p>
        <ButtonComponent label="Toggle" onClick={handleToggle} />
      </div>
    </>
  );
}

export default App;
