import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useUser } from '../UserProvider';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';


export function SignIn() {
   const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
   const { user, setUser } = useUser();
   const navigate = useNavigate();


  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
          // console.log("TEST");

    try {
      // Envoi des données de connexion au serveur
      const response = await axios.post('http://localhost:3000/api/users/login', loginData);
      console.log(response.data);
      // Mettre à jour l'état de l'utilisateur avec setUser
      // Si les informations de connexion sont correctes, rediriger vers la page de profil
      if (response.data.success) {
        setUser(response.data.user);
        console.log(response.data.user); // Afficher les données de l'utilisateur dans la console

        
        // Redirection vers la page de profil
      navigate('/profile');
      } else {
        // Affichage d'un message d'erreur si les informations de connexion sont incorrectes
        setError('Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error(error);
      setError('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  // const responseGoogle = async (response) => {
  //   try {
  //     // Envoyer le tokenId reçu de Google au serveur pour l'authentification OAuth
  //     const res = await axios.post('/api/oauth/google', { tokenId: response.tokenId });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Se Connecter</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Entre votre email et votre mot de passe pour vous connecter</Typography>
        </div>
        <form onSubmit={handleLogin} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
        {/* <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"> */}
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="nom@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={handleChange}
              value={loginData.email}
              type="email"
              name="email"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Mot de passe
            </Typography>
            <Input
              type="password"
              value={loginData.password}
              name="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                J'accepte&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          {/* <Link to="/profile" className="text-gray-900 ml-1"> */}
            <Button className="mt-6" fullWidth type="submit">
            Se Connecter
          </Button>
          {/* </Link> */}
          {/* </form> */}
          

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Mot de passe oublié
              </a>
            </Typography>
          </div>
          <div className="space-y-4 mt-8">
            {/* <GoogleLogin
          clientId="614071081452-ktd98vv2kc804gmgk5bq6o88m1m4gqdb.apps.googleusercontent.com"
          buttonText="Se connecter avec Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        /> */}
            
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/sign-up" className="text-gray-900 ml-1">S'inscrire</Link>
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


export default SignIn;
