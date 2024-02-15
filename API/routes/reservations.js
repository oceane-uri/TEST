// routes/reservations.js
const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// Middleware pour récupérer une réservation par ID
async function getReservation(req, res, next) {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({
                message: 'Réservation non trouvée'
            });
        }
        res.reservation = reservation;
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Route pour créer une nouvelle réservation de service
router.post('/', async (req, res) => {
    try {
        const {
            userId,
            serviceType,
            date
        } = req.body;
        if (!userId || !serviceType || !date) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires."
            });
        }
        const newReservation = new Reservation({
            userId,
            serviceType,
            date
        });
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Route pour récupérer toutes les réservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Route pour récupérer une réservation par ID
router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({
                message: 'Réservation non trouvée'
            });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Route pour mettre à jour une réservation
router.patch('/:id', getReservation, async (req, res) => {
    if (req.body.serviceType != null) {
        res.reservation.serviceType = req.body.serviceType;
    }
    if (req.body.date != null) {
        res.reservation.date = req.body.date;
    }
    try {
        const updatedReservation = await res.reservation.save();
        res.json(updatedReservation);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// // Route pour supprimer une réservation
// router.delete('/:id', getReservation, async (req, res) => {
//     try {
//         await res.reservation.remove();
//         res.json({
//             message: 'Réservation supprimée'
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });

// async function getReservation(req, res, next) {
//     try {
//         reservation = await Reservation.findById(req.params.id);
//         if (reservation == null) {
//             return res.status(404).json({
//                 message: 'Réservation introuvable'
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }

//     res.reservation = reservation;
//     next();
// }

// Route pour supprimer une réservation
router.delete('/:id', getReservation, async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            return res.status(404).json({
                message: 'Réservation introuvable'
            });
        }
        res.json({
            message: 'Réservation supprimée avec succès'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;