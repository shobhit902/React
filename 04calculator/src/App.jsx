import { useState } from "react";
import "./App.css";

function Input({ value, onChange, placeholder }) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border-2 p-2 rounded-xl max-w-3xs"
    />
  );
}

function Button({ label, onClick }) {
  return (
    <button
      className="border-2 m-2 p-2 rounded-xl bg-blue-700 text-white hover:bg-blue-900 "
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function Result({ result }) {
  return (
    <>
      <h1 className="uppercase semibold text-2xl text-gray">
        Result: {result}
      </h1>
    </>
  );
}

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(0);
  return (
    <>
      <h1 className="text-3xl font-semibold mb-10 text-gray-700">
        Calculator App
      </h1>
      <div className="flex flex-col gap-2 items-center">
        <Input
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter First NUmber"
        />
        <Input
          value={num2}
          onChange={(e) => setNum2(Number(e.target.value))}
          placeholder="Enter Second NUmber"
        />
        <div>
          <Button
            label="Addition"
            onClick={() => {
              setResult(Number(num1) + Number(num2));
              setNum1("");
              setNum2("");
            }}
          />
          <Button
            label="Subtraction"
            onClick={() => {
              setResult(Number(num1) - Number(num2));
              setNum1("");
              setNum2("");
            }}
          />
          <Button
            label="Multiplication"
            onClick={() => {
              setResult(Number(num1) * Number(num2));

              setNum1("");
              setNum2("");
            }}
          />
          <Button
            label="Divison"
            onClick={() => {
              if (Number(num2) === 0) {
                alert("Cannot divide by 0");
                return;
              }
              setResult(Number(num1) / Number(num2));
              setNum1("");
              setNum2("");
            }}
          />
        </div>
      </div>
      <Result result={result} />
    </>
  );
}

export default App;
