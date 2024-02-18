import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Paper, Button } from '@material-ui/core';
import { PencilIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

import { useUser } from '../UserProvider';

const AdminUsersPage = () => {
  const { users } = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleInfoClick = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setOpenModal(false);
  };

  return (
    <div className="mt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2>Liste des Utilisateurs</h2>
      <ul role="list" className="divide-y divide-gray-100">
        {users.map((user) => (
          <li key={user.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{user.firstName} . {user.lastName}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => handleInfoClick(user)}
              >
                <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                Infos
              </button>
            </div>
          </li>
        ))}
      </ul>
     <Modal open={openModal} onClose={handleCloseModal}>
        <div className="flex justify-center items-center h-screen">
          <Paper className="p-8">
            <h2 className="text-xl font-semibold mb-4">Informations Utilisateur</h2>
            {selectedUser && (
              <div>
                <p>Nom: {selectedUser.firstName}</p>
                <p>Email: {selectedUser.email}</p>
                {/* Ajoutez d'autres informations de l'utilisateur ici */}
                <h3 className="mt-4">Réservations de l'utilisateur</h3>
                <UserReservations userId={selectedUser._id} />
              </div>
            )}
            <button onClick={handleCloseModal} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Fermer</button>
            {selectedUser && selectedUser.reservations && selectedUser.reservations.length > 0 && (
              <Link to={`/details/${selectedUser.reservations[0].userId}`}>
                <button className="mt-4 inline-flex w-full justify-center rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">More</button>
              </Link>
            )}
          </Paper>
        </div>
      </Modal>
    </div>
  );
};

const UserReservations = ({ userId }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/reservations/user/${userId}`);
        setReservations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
      }
    };

    fetchReservations();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} à ${hours}:${minutes}`;
  };

  return (
    <ul>
      {reservations.map((reservation) => (
        <li key={reservation._id}> Service: {reservation.serviceType}, Date: {formatDate(reservation.date)}, Status: {reservation.status}</li>
      ))}
    </ul>
  );
};

export default AdminUsersPage;
