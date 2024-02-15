// models/reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    serviceType: String,
    date: Date,
    status: {
        type: String,
        default: 'En attente'
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);
