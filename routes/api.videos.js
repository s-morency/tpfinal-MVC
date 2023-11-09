const express = require('express');
const router = express.Router();
const multer = require('multer');
const Video = require('../database/models/video.model');
const ffmpeg = require('fluent-ffmpeg');
const AWS = require('aws-sdk');
const videosQueries = require('../queries/videos.queries');

const s3 = new AWS.S3({
  accessKeyId: 'AKIA22TL3ATASRWYABE5',
  secretAccessKey: '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'
});


//  AKIA22TL3ATASRWYABE5

//  yNGGekM27IkfELgdq/wjEDsyLFESkYk0V7RLJKQY

const upload = multer();

// La gestion de l'envoie de la vidéo
router.post('/', upload.single('video'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const file = req.file;
    const filename = req.file.originalname; 

    console.log('req file is: ' + req.file.originalname)

    // Envoyé la vidéo à AWS S3
    const videoKey = `videos/${Date.now()}-${file.originalname}`;
    await s3.upload({
      Bucket: 'aec-serveur2-tpfinal',
      Key: videoKey,
      Body: file.buffer
    }).promise();

    const videoUrl = `https://aec-serveur2-tpfinal.s3.amazonaws.com/${videoKey}`;



    // Générer un thumbnail
    ffmpeg(videoUrl)
      .screenshots({
        timestamps: ['50%'], // Prendre une capture à 50% de la vidéo
        filename: 'thumbnail-' + filename + '.png',
        folder: './thumbnails'
      })
      .on('end', () => {
        console.log('L\'image du vidéo a été générée.');
      });





    // Données pour la BD
    const newVideo = new Video({
      title: title,
      description: description,
      category: category,
      filename: videoUrl,
      thumbnail: 'thumbnail-' + filename + '.png',
    });

    // Insérer les données de la vidéo dans la base de données.
    await videosQueries.insertVideo(videoData);



    res.redirect('/videos'); 
  } catch (error) {
    console.error('Erreur en envoyant la vidéo:', error);
    res.status(500).json({ error: 'Une erreur est survenue en tentant d\'envoyer la vidéo.' });
  }
});

module.exports = router;