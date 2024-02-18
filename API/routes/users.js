const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
// const mongoose = require('mongoose');




// Middleware pour récupérer un utilisateur par ID
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({
                message: 'Utilisateur non trouvé'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

    res.user = user;
    next();
}

async function getUsermail(req, res, next) {
    let user;
    try {

        user = await User.findOne({
            email: req.params.email
        });
        if (user == null) {
            return res.status(404).json({
                message: 'Utilisateur non trouvé'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

    res.user = user;
    next();
}

// Route pour créer un nouvel utilisateur
router.post('/', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires."
            });
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Route pour récupérer tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Route pour récupérer un utilisateur par ID
// router.get('/:id', getUser, (req, res) => {
//     res.json(res.user);
// });

// Route pour mettre à jour un utilisateur
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.firstName != null) {
        res.user.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
        res.user.lastName = req.body.lastName;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

//Route pour récupérer un utilisateur à partir de son email
router.get('/:email', getUsermail, (req, res) => {
    res.json(res.user);
});


//         // Vérifiez si le mot de passe est correct
//         const isPasswordValid = await user.comparePassword(password);

//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 message: "Mot de passe incorrect"
//             });
//         }

//         // Si les informations d'identification sont correctes, renvoyez une réponse réussie
//         res.status(200).json({
//             message: "Connexion réussie",
//             user
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Erreur lors de la tentative de connexion"
//         });
//     }
// });
// Route pour supprimer un utilisateur
router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Supprimer l'utilisateur de la base de données
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                message: 'Utilisateur non trouvé'
            });
        }

        // Supprimer toutes les réservations associées à cet utilisateur
        await Reservation.deleteMany({
            userId: deletedUser._id
        });

        res.status(200).json({
            message: 'Utilisateur et ses réservations supprimés avec succès'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression de l\'utilisateur et de ses réservations'
        });
    }
});

// Route pour gérer la connexion des utilisateurs
router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        // Recherche de l'utilisateur dans la base de données par son email
        const user = await User.findOne({
            email
        });

        // Vérification si l'utilisateur existe
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        // Si l'utilisateur et le mot de passe sont valides, renvoyer une réponse de succès
        res.json({
            success: true,
            message: 'Connexion réussie',
            user: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite. Veuillez réessayer.'
        });
    }
});

// // Route pour l'inscription d'un nouvel utilisateur
// router.post('/register', async (req, res) => {
//     const {
//         firstName,
//         lastName,
//         email,
//         password
//     } = req.body;

//     try {
//         // Vérifier si l'utilisateur existe déjà dans la base de données
//         let user = await User.findOne({
//             email
//         });

//         // Si l'utilisateur existe déjà, retourner une erreur
//         if (user) {
//             return res.status(400).json({
//                 message: 'Cet utilisateur existe déjà'
//             });
//         }

//         // Si l'utilisateur n'existe pas, créer un nouvel utilisateur
//         user = new User({
//             firstName,
//             lastName,
//             email,
//             password
//         });

//         // Hasher le mot de passe
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         // Enregistrer l'utilisateur dans la base de données
//         await user.save();

//         res.json({
//             success: true,
//             message: 'Utilisateur enregistré avec succès'
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: 'Erreur lors de l\'inscription de l\'utilisateur'
//         });
//     }
// });



// router.delete('/:userId', async (req, res) => {
//     const userId = req.params.userId;

//     try {
//         // Supprimer l'utilisateur de la base de données
//         const deletedUser = await User.findByIdAndDelete(userId);

//         if (!deletedUser) {
//             return res.status(404).json({
//                 message: 'Utilisateur non trouvé'
//             });
//         }

//         res.status(200).json({
//             message: 'Utilisateur supprimé avec succès'
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: 'Une erreur est survenue lors de la suppression de l\'utilisateur'
//         });
//     }
// });

module.exports = router;