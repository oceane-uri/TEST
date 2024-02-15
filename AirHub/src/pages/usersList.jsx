// UsersList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <p>Nom : {user.name}</p>
            <p>Email : {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
