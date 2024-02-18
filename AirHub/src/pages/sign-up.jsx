import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';



export function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users', formData);
      console.log(response.data);
    // Si l'inscription est réussie, je redirige vers la page de connexion
      if (response.data.success) {
        window.location.href = '/sign-in';
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Commencez votre aventure avec nous</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Entrez vos informations</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Nom
            </Typography>
            <Input
              name="lastName"
              type="text"
              size="lg"
              placeholder="Nom"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={handleChange}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Prénom
            </Typography>
            <Input
              name="firstName"
              type="text"
              size="lg"
              placeholder="Prénom"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={handleChange}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              name="email"
              size="lg"
              placeholder="nom@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={handleChange}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Mot de passe
            </Typography>
            <Input
              name="password"
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={handleChange}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                J'accepte les&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Conditions générales
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth type="submit">
            S'enregistrer
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Déjà un compte ?
            <Link to="/sign-in" className="text-gray-900 ml-1">Connectez-vous</Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignUp;
