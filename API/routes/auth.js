// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

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

// Route pour déconnecter l'utilisateur
router.get('/logout', (req, res) => {
    req.logout();
    // Rediriger vers la page d'accueil ou toute autre page après la déconnexion
    res.redirect('/');
});

module.exports = router;