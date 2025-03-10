import React, { useState } from "react";
import { FaTrash, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const User = () => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([
    { _id: "1", name: "John Doe", email: "john@example.com", role: "user" },
    { _id: "2", name: "Jane Smith", email: "jane@example.com", role: "admin" },
    {
      _id: "3",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "user",
    },
  ]);

  const handleRoleChange = (id, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, role: newRole } : user
      )
    );
    toast.success("User role updated successfully!");
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    toast.success("User deleted successfully!");
  };

  return (
    <div className="p-4 sm:p-8 bg-[#788673] min-h-[100vh] flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">User Management</h2>
      {error && <p className="text-red-600 text-center my-2">{error}</p>}

      {users.length === 0 ? (
        <p className="text-lg text-gray-600">No users exist.</p>
      ) : (
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="min-w-full bg-[#f3f4f6] border rounded-lg">
            <thead>
              <tr className="bg-[#afcdd2] text-left">
                <th className="p-3 text-nowrap">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Update Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-3 text-nowrap">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <div className="relative inline-block">
                      <button className="bg-[#0a2281] text-white px-4 py-1 rounded-md flex items-center">
                        <FaUser className="mr-2" />
                        {user.role}
                      </button>
                      <select
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 hover:cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;
