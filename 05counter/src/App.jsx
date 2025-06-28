import { use, useState } from "react";
// import './App.css'

function App() {
  const [count, setCount] = useState(5);
  const [message, setMessage] = useState("");
  function addValue() {
    setCount(count + 1);
    setMessage("");
  }
  function removeValue() {
    if (count === 0) {
      setMessage("can't be negative");
    } else {
      setCount(count - 1);
      setMessage("");
    }
  }
  return (
    <>
      <h1>Counter App</h1>
      <h3>Count value:{count}</h3>
      <button onClick={addValue}>Add</button>
      <button onClick={removeValue}>Remove</button>
      {setMessage && <p style={{ color: "red" }}>{message}</p>}
    </>
  );
}

export default App;
