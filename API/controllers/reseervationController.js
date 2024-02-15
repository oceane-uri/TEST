// controllers/reservationController.js
const Reservation = require('../models/reservation');

// Créer une nouvelle réservation de service
exports.createReservation = async (req, res) => {
    try {
        const {
            userId,
            serviceType,
            date
        } = req.body;

        // Vérifier si les données requises sont fournies
        if (!userId || !serviceType || !date) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires."
            });
        }

        // Créer une nouvelle réservation
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
};
