//Importation des modules necessaires
const express = require('express'); // Express est un framework web pour Node.js
const morgan = require('morgan'); // Morgan est un middleware de logging pour Express
const path = require('path'); // Le module 'path' fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoire
const multer = require('multer'); // Multer est un middleware qui gère l'envoie de fichiers multipart sur le serveur.
const ffmpeg = require('fluent-ffmpeg'); // Permet de manipuler les vidéos

//Initialisation de la base de donnée
require('./database');

// Création de l'application Express
const app = express();
// Définition du numéro de port sur lequel l'application va écouter
const port = process.env.PORT || 3000;
// Le code utilise la variable d'environnement 'PORT' si elle existe, sinon il utilise le port 3000 par défaut
// Importation des routes définies dans le fichier './routes.js'
const index = require('./routes');
// Configuration des paramètres de l'application
app.set('views', path.join(__dirname, 'views')); // Définit le dossier 'views' comme emplacement des fichiers de vue (pug) 
app.set ('view engine', 'pug'); // Définit le moteur de rendu de vue à utiliser (pug dans ce cas)

/// utilisation des middlewares
// Utilise le middleware de logging Morgan pour enregistrer les requêtes entrantes
app.use(morgan('short'));
// Définit le dossier 'public' pour servir les fichiers statiques (css, images, etc.)
app.use(express.static(path.join(__dirname,'public')));
// Lorsqu'une requête arrive avec un corps au format JSON, le middleware express.json() le parse et le transforme en objet JavaScript.
app.use(express.json ());
app.use(express.urlencoded({ extended: true })); // Le middleware pour analyser les corps de requête au format x-www-form-urlencoded
//Le format x-www-form-urlencoded est couramment utilisé pour envoyer des données à partir de formulaires HTML.
// Lorsque vous soumettez un formulaire HTML avec la méthode POST et l'en-tête Content-Type défini sur 
// application/x-www-form-urlencoded, les données du formulaire sont encodées dans le format de requête x-www-form-ur lencoded.
// Utilise les routes définies dans le fichier './routes.is'
app.use (index);
// Démarre le serveur en écoutant les requêtes sur le port spécifié
app.listen(port);