// Importation des modules nécessaires
const router = require('express').Router (); // Importation du routeur Express

// Importation du sous-routeur 'api.videos' qui gère spécifiquement les opérations liées aux videos
const videos = require('./api.videos');

// Montage du sous-routeur 'videos' sur le chemin '/videos'
// Cela signifie que toutes les routes définies dans 'api.videos' seront préfixées par '/videos' 
router.use('/videos', videos);

// Exportation du routeur pour l'utiliser dans l'application principale
module.exports = router;