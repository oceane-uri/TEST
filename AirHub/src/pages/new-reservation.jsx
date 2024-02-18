import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Input } from "@material-tailwind/react";
import axios from 'axios';
import { useUser } from "../UserProvider";

export function NewReservationForm() {
const { user } = useUser();
 const [reservationData, setReservationData] = useState({
    date: "", // Champ unique pour la date et l'heure
    serviceType: "",
    userId: user ? user._id : null, 
  });
    console.log("UserId:", reservationData.userId)

  const handleChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('Date avant formatage :', reservationData.date)

        const formattedDate = new Date(reservationData.date).toISOString();
        const updatedReservationData = {
      ...reservationData,
      date: formattedDate
    };

      // Envoyer les données de la réservation au serveur pour la création
      const response = await axios.post('http://localhost:3000/api/reservations', updatedReservationData);
      
      // Gérer la réponse du serveur ici
      
    } catch (error) {
      console.error('Erreur lors de la création de la réservation :', error);
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Réserver un service
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Entrez les informations pour créer une nouvelle réservation
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Date et heure
            </Typography>
            <Input
              name="date"
              type="datetime-local" // Utiliser le type datetime-local pour sélectionner la date et l'heure
              size="lg"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={handleChange}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Type de service
            </Typography>
            <select
              name="serviceType"
              value={reservationData.serviceType}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            >
              <option value="">Sélectionner un type de service</option>
              <option value="Fast track">Fast track</option>
              <option value="Assistance check-in">Assistance check-in</option>
              <option value="Accueil VIP">Accueil VIP</option>
            </select>
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Réserver
          </Button>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          alt="Pattern"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default NewReservationForm;
