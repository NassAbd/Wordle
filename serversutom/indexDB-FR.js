const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
const dbName = "Wordle";

async function main() {
    try {
        // Connexion à la base de données
        await client.connect();
        console.log("Connexion à la base de données réussie.");
    } catch (error) {
        console.error("Erreur lors de la connexion à la base de données :", error);
    }
}

main();

async function chooseWord(taille, langue) {
    try {
        console.log('taille appelée : ', taille);
        const database = client.db(dbName);
        let collection;
        
        if (langue === 'fr'){
            collection = database.collection('Word-FR');
        } else if (langue === 'en'){
            collection = database.collection('Word-EN');
        }

        console.log("langue : ", langue);

        // Pipeline d'agrégation
        const pipeline = [
            { 
                $match: {
                    $expr: { $eq: [{ $strLenCP: "$mot" }, taille] }
                }
            },
            { $sample: { size: 1 } }
        ];

        // Exécution de l'agrégation
        const result = await collection.aggregate(pipeline).toArray();

        // Afficher le résultat
        if (result.length > 0) {
            const documentAleatoire = result[0];
            return documentAleatoire;
        } else {
            console.log('Aucun document ne correspond à la condition.');
        }
    } catch (error) {
        console.error("Erreur lors de l'exécution de chooseWord :", error);
    }
}

module.exports = { chooseWord };

