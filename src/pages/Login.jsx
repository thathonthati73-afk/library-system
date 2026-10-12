import { useState } from "react";

function Login({ users, onLogin }) {
  const [name, setName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const found = users.find(
      (u) =>
        u.name.toLowerCase() === name.trim().toLowerCase() &&
        u.membershipId === membershipId.trim()
    );
    if (found) {
      onLogin(found);
    } else {
      setError("Wrong name or membership ID");
    }
  }

  return (
    <div className="login-box">
      <h2>Library Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Membership ID" value={membershipId} onChange={(e) => setMembershipId(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p className="hint">Use name Nthati and ID LIB001 to log in</p>
    </div>
  );
}

export default Login;
