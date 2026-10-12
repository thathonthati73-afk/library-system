import { useState } from "react";

const emptyUser = { name: "", membershipId: "", role: "member" };

// used for adding a user and for updating a user
function UserForm({ initialUser, onSave, buttonText, onCancel }) {
  const [user, setUser] = useState(initialUser || emptyUser);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (user.name.trim() === "") newErrors.name = "Name is required";
    if (user.membershipId.trim() === "") newErrors.membershipId = "Membership ID is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const error = onSave(user);
    if (error) {
      setErrors({ membershipId: error });
      return;
    }
    if (!initialUser) setUser(emptyUser);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={user.name} onChange={handleChange} />
      {errors.name && <p className="error">{errors.name}</p>}
      <input name="membershipId" placeholder="Membership ID" value={user.membershipId} onChange={handleChange} />
      {errors.membershipId && <p className="error">{errors.membershipId}</p>}
      <select name="role" value={user.role} onChange={handleChange}>
        <option value="member">Member</option>
        <option value="librarian">Librarian</option>
        <option value="admin">Admin</option>
      </select>
      <div>
        <button type="submit">{buttonText}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default UserForm;
