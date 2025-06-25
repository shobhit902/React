import { useState } from "react";
import "./App.css";

const user = {
  name: "shobhit",
  email: "shobhit@gmail.com",
  location: "",
};

const { name, email, location: city } = user;

function UserCard({ name, email, city = "Rishikesh" }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <> 
    <p>{name}</p>
    { showDetails && (
      <> 
      <p>{email}</p>
      <p>{city || "Rishikesh"}</p>
      </>
    )  }
    
       <button onClick={()=> setShowDetails(prev => !prev)}>
        {showDetails? "Hide" : "show" } Details 
       </button>
    </>
  );
}

function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ padding: "10px 20px", borderRadius: "5px" }}
    >
      {label}
    </button>
  );
}

function Avatar({ src, alt, size }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ borderRadius: "5px" }}
    />
  );
}

function Card({ title, content, children }) {
  return (
    <>
      <div style={{ fontFamily: "arial", color: "" }}>
        <h1>{title}</h1>
        <p>content {content}</p>
        {children}
      </div>
    </>
  );
}
function App() {
  const [count, setCount] = useState(0);
  const addValue = () => setCount((count) => count + 1);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Count is {count}</p>
        <Button label="Add Count" onClick={addValue} />
        <Avatar
          src="https://picsum.photos/seed/picsum/200"
          alt="Mountain"
          size="100px"
        />
        <Card title="heading" content="A simple card" />
        <UserCard name={name} email={email} city={city} />
      </div>
    </>
  );
}

export default App;
