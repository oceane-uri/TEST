import { useState, useEffect } from "react";
import axios from 'axios';
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";

// Composant Profile
export function Profile() {
  // Etat pour stocker les informations de l'utilisateur
  const [userData, setUserData] = useState({});
  // Etat pour stocker les réservations de l'utilisateur
  const [reservations, setReservations] = useState([]);

  // Fonction pour récupérer les informations de l'utilisateur
  useEffect(() => {
    // Fonction asynchrone pour récupérer les informations de l'utilisateur
    async function fetchUserData() {
      try {
        // Requête pour récupérer les informations de l'utilisateur
        const response = await axios.get('http://localhost:3000/api/users/profile');
        // Mise à jour de l'état avec les informations de l'utilisateur
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    // Appel de la fonction pour récupérer les informations de l'utilisateur
    fetchUserData();
  }, []);

  // Fonction pour récupérer les réservations de l'utilisateur
  useEffect(() => {
    // Fonction asynchrone pour récupérer les réservations de l'utilisateur
    async function fetchUserReservations() {
      try {
        // Requête pour récupérer les réservations de l'utilisateur en fonction de son ID
        const response = await axios.get(`http://localhost:3000/api/reservations?userId=${userData._id}`);
        // Mise à jour de l'état avec les réservations de l'utilisateur
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching user reservations:', error);
      }
    }

    // Vérification que l'utilisateur est bien chargé avant de récupérer ses réservations
    if (userData._id) {
      // Appel de la fonction pour récupérer les réservations de l'utilisateur
      fetchUserReservations();
    }
  }, [userData._id]); // Effectuer la requête uniquement lorsque l'ID de l'utilisateur est disponible

  // Affichage de la page Profile
  return (
    <>
      <section className="relative block h-[50vh]">
        {/* Contenu du bloc */}
      </section>
      <section className="relative bg-white py-16">
        {/* Contenu de la section */}
        <div className="container mx-auto">
          {/* Affichage de Bienvenue et du nom de l'utilisateur */}
          <Typography variant="h2" className="font-bold mb-4">Bienvenue {userData.firstName} {userData.lastName}</Typography>
          {/* Affichage des réservations de l'utilisateur */}
          <div>
            <Typography variant="h4" className="font-bold mb-4">Vos réservations :</Typography>
            {/* Affichage de la liste des réservations */}
            <ul>
              {reservations.map(reservation => (
                <li key={reservation._id}>
                  <Typography variant="paragraph" className="font-medium">Type de service : {reservation.serviceType}</Typography>
                  <Typography variant="paragraph" className="font-medium">Statut : {reservation.status}</Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* Pied de page */}
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Profile;
