import { useState } from "react";
import "./App.css";

function Avatar({ src, alt }) {
  return <img src={src} alt={alt} />;
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
  const [follow, unFollow] = useState(false);

  return (
    <>
      <Avatar src={user.avatar} alt={user.name} />
      <UserInfo name={user.name} email={user.email} />
      {children}
      <ActionButton
        label={follow ? "unfollow" : "follow"}
        onClick={() => {
          unFollow((prev) => !prev);
        }}
      />
    </>
  );
}
function App() {
  const user = {
    name: "shobhit",
    avatar: "https://picsum.photos/100",
    email: "shobhit1948@gmail.com",
  };

  return (
    <>
      <h1>Profile Card</h1>
      <ProfileCard user={user}></ProfileCard>
    </>
  );
}

export default App;
