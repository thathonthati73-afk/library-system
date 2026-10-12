import { useState } from "react";
import UserForm from "../components/UserForm";

function Users({ users, setUsers, currentUser }) {
  const [editingId, setEditingId] = useState(null);

  // only admins can manage users
  if (currentUser.role !== "admin") {
    return <p>Only admins can manage users.</p>;
  }

  function addUser(newUser) {
    if (users.some((u) => u.membershipId === newUser.membershipId)) {
      return "This membership ID is already used";
    }
    setUsers([...users, { ...newUser, id: Date.now() }]);
    return "";
  }

  function updateUser(updated) {
    if (users.some((u) => u.membershipId === updated.membershipId && u.id !== editingId)) {
      return "This membership ID is already used";
    }
    setUsers(users.map((u) => (u.id === editingId ? { ...updated, id: editingId } : u)));
    setEditingId(null);
    return "";
  }

  function deleteUser(id) {
    if (id === currentUser.id) {
      alert("You cannot delete the user you are logged in as");
      return;
    }
    if (window.confirm("Delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  }

  return (
    <div>
      <h2>User Management</h2>
      <h3>Add new user</h3>
      <UserForm onSave={addUser} buttonText="Add User" />

      <h3>All users</h3>
      {users.map((user) =>
        editingId === user.id ? (
          <div className="card" key={user.id}>
            <UserForm
              initialUser={user}
              onSave={updateUser}
              buttonText="Save"
              onCancel={() => setEditingId(null)}
            />
          </div>
        ) : (
          <div className="card row" key={user.id}>
            <div>
              <b>{user.name}</b> | {user.membershipId} | {user.role}
            </div>
            <div>
              <button onClick={() => setEditingId(user.id)}>Update</button>
              <button className="danger" onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Users;
