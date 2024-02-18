import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Card, Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import axios from 'axios';
import { Footer } from "@/widgets/layout";
import { useUser } from "../UserProvider"; 
import { useNavigate } from 'react-router-dom';


export function Profile() {
   const navigate = useNavigate();
  const { user, reservations, isLoading, error } = useUser();
   const handleNewReservationClick = () => {
    // Redirection vers la page de nouvelle réservation
    navigate('/new-reservation');
      };

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40">
                  <Avatar
                    src="/img/team-5.png"
                    alt="Profile picture"
                    variant="circular"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <Typography variant="h4" color="blue-gray">
                     {user && user.firstName} 
                  </Typography>
                  <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">{user && user.email} </Typography>
                </div>
              </div>

              <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
               <Button onClick={handleNewReservationClick} className="bg-gray-900 w-fit lg:ml-auto">
               Nouvelle Réservation
                </Button>
                <div className="flex justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      22
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Friends
                    </Typography>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      10
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Photos
                    </Typography>
                  </div>
                  <div className="p-3 text-center lg:mr-4">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      89
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Comments
                    </Typography>
                  </div>
                </div>

              </div>
            </div>
            <div className="mb-10 py-6">
        <div className="mb-10 py-6">
            <div className="flex flex-wrap -mx-4">
              {reservations.map((reservation) => (
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8" key={reservation._id}>
                  <Card color="transparent" shadow={false} className="text-center border border-gray-200 rounded-lg p-4">
                    <Typography variant="h5" color="blue-gray" className="mt-6 mb-1">
                      {reservation.serviceType}
                    </Typography>
                    <Typography className="font-bold text-blue-gray-500">
                      Date: {reservation.date}
                    </Typography>
                    <Typography className="font-bold text-blue-gray-500">
                      Statut: {reservation.status}
                    </Typography>
                    <Button
                      className="bg-gray-800 hover:bg-gray-600 mt-4"
                      onClick={() => handleUpdateReservationClick(reservation._id)}
                    >
                      Modifier
                    </Button>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
          </div>

        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>

    </>
  );
}

export default Profile;