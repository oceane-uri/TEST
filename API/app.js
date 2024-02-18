// Importer les modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const userRoutes = require('./routes/users');
const reservationRoutes = require('./routes/reservations');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');

// Créer une instance de l'application Express
const app = express();
const cors = require('cors');

// Activation de CORS pour toutes les requêtes
app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


// Middleware pour permettre les requêtes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Remplacez YOUR_FRONTEND_PORT par le port de votre frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Middleware pour analyser les corps de requête JSON
app.use(express.json());

// Middleware pour analyser les cookies
app.use(cookieParser());



// Définir le port d'écoute du serveur
const PORT = process.env.PORT || 3000;

// Utilisation de Passport Middleware
app.use(passport.initialize());

// Middleware
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/auth', authRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});