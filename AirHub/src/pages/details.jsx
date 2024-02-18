// Details.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Details = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUser(userResponse.data);
        const reservationsResponse = await axios.get(`http://localhost:3000/api/reservations/user/${userId}`);
        setReservations(reservationsResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Informations Utilisateur</h2>
      <p>Nom: {user.firstName}</p>
      <p>Email: {user.email}</p>
      {/* Afficher d'autres informations de l'utilisateur ici */}
      <h2>Réservations de l'utilisateur</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation._id}>{/* Afficher ici les détails de chaque réservation */}</li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
