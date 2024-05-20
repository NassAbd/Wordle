// Création de l'application Express
const express = require('express')
const cors = require('cors'); //npm install cors
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, '../sutom/public')))

// Elements relatifs à mangoDB
const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const { chooseWord } = require('./indexDB-FR.js');

// Configurer CORS pour autoriser les requêtes depuis localhost:3000 (port de l'appli React)
app.use(cors({ origin: 'http://localhost:3000' }));

// Définition de la route racine
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'index.html'));
})

// Utiliser body-parser middleware pour analyser les corps de requête JSON
app.use(bodyParser.json());

app.post('/getMot', async (req, res) => { 
    try {

        const { number, language } = req.body;

        console.log("langue index : ", language);

        chosenWord = await chooseWord(number, language);
        if (chosenWord) {
            // Connexion réussie
            res.status(200).json({ success: true, mot: chosenWord.mot});
        } else {
            // Connexion échouée
            res.status(401).json({ success: false, message: 'Aucun mot trouvé' });
        }
    } catch (error) {
        // Gérer les erreurs
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la connexion' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});