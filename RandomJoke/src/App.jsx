import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState(null);
  const [errorsMsg, setErrorsMsg] = useState("");

  const fetchUsers = () =>
    fetch("https://randomuser.me/api?results=5")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        console.log(data);
        setErrorsMsg("");
      })
      .catch((error) => {
        console.error("sometthing went wrong", error);
        setErrorsMsg("could not load users");
      });

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUsers();
    }, 5000);

    const timeout = setTimeout(() => clearInterval(intervalId), 12000);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeout);
    };
  }, []);

  if (!users) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="font-semibold text-xl ml-5 p-3 text-gray-800">
        Random User
      </h1>

      <button
        className="bg-blue-600 hover:bg-blue-800 text-white rounded-xl p-2 ml-8"
        onClick={fetchUsers}
      >
        Get Users
      </button>

      {users.map((item) => {
        return (
          <div key={item.email} className="border p-4 m-2 rounded">
            <h2>
              {item.name.first} {item.name.last}
            </h2>
            <p>Email: {item.email}</p>
            <img
              src={item.picture.large}
              alt="User"
              className="w-24 rounded-full"
            />
          </div>
        );
      })}
      {errorsMsg && <p className="text-red-500">{errorsMsg}</p>}
    </>
  );
}

export default App;
