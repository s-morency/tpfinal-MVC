// Importation des modules nécessaires
const router = require('express').Router(); // Importation du routeur Express
const api = require('./api');               // Importation des routes d'API
const videosController = require('../controller/videos.controller');

// Montage des routes d'API sur le chemin '/api' (c'est-à-dire que toutes les routes définies dans 'api' commenceront par '/api')
router.use('/api', api);

// Route pour afficher le formulaire permettant de créer de nouveaux videos
router.get('/videos/upload', videosController.getVideoForm);

// Route pour afficher le video
router.get('/videos/stream/:filename', videosController.streamVideo);

// Route pour afficher l'image.
router.get('/videos/thumbnails/:filename', videosController.getThumbnail); 

// Route pour aficher un vidéo spécifique.
router.get('/video/stream/:videoId', videosController.getVideoById);

// Route pour la page d'accueil
router.get('/videos', videosController.getHomePage);

// Exportation du routeur pour l'utiliser dans l'application principale
module.exports = router;