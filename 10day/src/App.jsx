import { useState } from "react";

function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 pl-4 pr-4 bg-gray-700 rounded text-white "
    >
      {label}
    </button>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function getData() {
    try {
      const response = await fetch("https://api.github.com/users/shobhit902");
      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  }


  return (
    <>
      <h1>10 day</h1>

      <Button label="Fetch GitHub Data" onClick={getData} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: "1rem" }}>
          <img
            src={data.avatar_url}
            alt="Avatar"
            width="100"
            style={{ borderRadius: "50%" }}
          />
          <p>Username: {data.login}</p>
          <p>Public Repos: {data.public_repos}</p>
          <a href={data.html_url} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </div>
      )}
    </>
  );
}

export default App;
