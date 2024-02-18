const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
    googleClientID,
    googleClientSecret
} = require('../config');

// Route pour démarrer le processus d'authentification avec Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Route de rappel pour terminer le processus d'authentification avec Google
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    // Rediriger vers la page de succès de connexion
    res.redirect('/success');
});

// Route pour gérer la demande POST depuis le frontend pour l'authentification avec Google
router.post('/google', (req, res) => {
    // Récupérer le tokenId envoyé depuis le frontend
    const tokenId = req.body.tokenId;


    res.status(200).json({
        message: 'Authentification avec Google réussie'
    });
});

// Route pour déconnecter l'utilisateur
router.get('/logout', (req, res) => {
    req.logout();
    // Rediriger vers la page d'accueil ou toute autre page après la déconnexion
    res.redirect('/');
});

module.exports = router;