import React from "react";
import "./style.css";

const App = ({ onGetNews, users, error, loading, onRemoveNews }) => (
  <div>
    <button className="btn" onClick={onGetNews} disabled={loading}>
      불러오기 {loading && "...가져오는 중"}
    </button>{" "}
    <button onClick={onRemoveNews} className="btn">
      지우기
    </button>
    {error && <div>{error.message}</div>}
    {loading && loading}
    {users && (
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    )}
  </div>
);

export default App;
