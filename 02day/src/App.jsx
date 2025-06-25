import { useState } from "react";
import "./App.css";

function Avatar({ src, alt, size }) {
  return <img src={src} alt={alt} style={{ borderRadius: "5px" }} />;
}

function UserInfo({ name, email }) {
  return (
    <>
      <h1>{name}</h1>
      <p>{email}</p>
    </>
  );
}

function ActionButton({ label, onClick }) {
  return (
    <>
      <button onClick={onClick}>{label}</button>
    </>
  );
}

function ProfileCard({ user, children }) {
  return (
    <>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 16,
          borderRadius: 10,
          width: 250,
        }}
      >
        <Avatar src={user.avatar} alt={user.name} />
        <UserInfo name={user.name} email={user.email} />
        {children}
      </div>
    </>
  );
}

function App() {
  const user = {
    name: "shobhit",
    email: "shobhit@gmail.com",
    avatar: "https://picsum.photos/100",
  };
  const [followed, setFollowed] = useState(false);
  return (
    <>
      <h1>Profile Card</h1>
      <ProfileCard user={user}>
        <ActionButton
          onClick={() => setFollowed((prev) => !prev)}
          label={followed ? "Unfollow" : "Follow"}
        />
      </ProfileCard>
    </>
  );
}

export default App;
