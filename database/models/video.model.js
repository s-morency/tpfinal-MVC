// Importation du module Mongoose
const mongoose = require('mongoose');

// Extraction de la classe Schema du module Mongoose
const schema = mongoose.Schema;

// Définition du schéma du video
const videoSchema = schema({
    title: {
        type: String,
        maxlength: [140, 'Nom trop long'],
        minlength: [1, 'Nom trop court'],
        required: [true, 'Champ requis']
    },
    category: {
        type: String,
        enum: ['Action', 'Comedie', 'Drame', 'Horreur', 'Science-fiction', 'Autre'],
        required: [true, 'Champ requis']
    },
    description: {
        type: String,
        maxlength: [500, 'Description trop longue'],
        required: [true, 'Champ requis']
    },
    filename: {
        type: String, // Assuming you want to store the filename as a string
        required: [true, 'Champ requis']
    },
    thumbnail: {
        type: String, // You can adjust this type based on the data structure of your thumbnail URLs
        required: [true, 'Champ requis']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Création du modèle de video à partir du schéma
const Video = mongoose.model('video', videoSchema);

// Exportation du modèle de video pour une utilisation ultérieure
module.exports = Video;