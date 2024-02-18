// controllers/userController.js
const passport = require('passport');
const User = require('../models/user');

//nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "Utilisateur non trouvé."
            });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedUser) {
            return res.status(404).json({
                message: "Utilisateur non trouvé."
            });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                message: "Utilisateur non trouvé."
            });
        }
        res.json({
            message: "Utilisateur supprimé avec succès."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Authentification d'un utilisateur
exports.authenticateUser = passport.authenticate('local', {
    session: false
});

// Fonction de vérification d'authentification
exports.verifyAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({
            message: 'Non autorisé.'
        });
    }
};

// Déconnexion de l'utilisateur
exports.logoutUser = (req, res) => {
    req.logout();
    res.json({
        message: 'Déconnexion réussie.'
    });
};
