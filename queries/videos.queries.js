const Video = require('../database/models/video.model');

// Fonction pour aller chercher tous les vidéos dans la base de données.
exports.getAllVideos = async () => {
  try {
    return await Video.find({}).exec();
  } catch (error) {
    throw error;
  }
};

// Fonction pour insérer les données d'une vidéo dans la base de données.
exports.insertVideo = async (videoData) => {
  try {
    const newVideo = new Video(videoData);
    return await newVideo.save();
  } catch (error) {
    throw error;
  }
};