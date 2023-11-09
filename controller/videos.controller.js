const Video = require('../database/models/video.model');
const path = require('path');
const fs = require('fs');
const videoQueries = require('../queries/videos.queries');

// Pour afficer le formulaire d'ajout de vidéo
exports.getVideoForm = (req, res) => {
    res.render('videos/video-form');
};

// Pour afficher le video 
exports.streamVideo = async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../uploads', filename);

        // S'assurer que la vidéo est de type MP4
        if (!filename.endsWith('.mp4')) {
            return res.status(400).send('Mauvaise requête : Format de fichier non pris en charge');
        }

        // Stream la vidéo
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;

        // S'assurer que la vidéo n'est pas trop large (20MB)
        const maxFileSize = 20 * 1024 * 1024; 
        if (fileSize > maxFileSize) {
            return res.status(400).send('Mauvaise requête : Taille de fichier trop grande');
        }
        
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = (end - start) + 1;
            const file = fs.createReadStream(filePath, { start, end });
        
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            };
        
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).send('Aucun vidéo trouvé');
        } else {
            console.error(error);
            res.status(500).send('Erreur de serveur');
        }
    }
};

exports.getVideoById = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const video = await Video.findOne({ _id: videoId }); // Trouver la vidéo
      if (!video) {
        return res.status(404).send('Vidéo non trouvé');
      }
      res.render('videos/video-stream', { video });
    } catch (error) {
      console.error('Erreur en tentant d\'afficher la vidéo:', error);
      res.status(500).send('Une erreur est survenue en tentant d\'afficher la vidéo.');
    }
};

exports.getThumbnail = (req, res) => {
    try {
        const filename = req.params.filename;
        const thumbnailPath = path.join(__dirname, '../thumbnails', filename);

        res.sendFile(thumbnailPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).send('Thumbnail not found');
        } else {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
};

exports.getHomePage = async (reg, res) => {
    try {
        // Tente de récupérer tous les videos de la base de données
        const videos = await videoQueries.getAllVideos();

        if (!videos || videos.length === 0) {
            // Si aucun vidéo trouvée, afficher une erreur
            return res.status(404).send('Aucun vidéo trouvée.'); 
        }

        // si la récupération est réussie, rend la page de liste des videos avec les videos récupérés
        res.render('videos/video-list', { videos });
    } catch (err) {
        // Si une erreur se produit pendant la récupération des videos, log l'erreur et envoie un message d'erreur 500 au client
        console.error(err);
        res.status(500).send('Erreur interne du serveur. ');
    }
};