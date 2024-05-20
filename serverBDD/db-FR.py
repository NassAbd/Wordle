from pymongo import MongoClient

# Connexion à MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['Wordle']
collection = db['Word-FR']

# Lire le fichier texte
with open('liste_francais.txt', 'r', encoding='utf-8') as file:
    mots = file.readlines()

# Préparer les documents pour MongoDB
documents = [{"mot": mot.strip()} for mot in mots]

# Insérer les documents dans la collection MongoDB
if documents:
    collection.insert_many(documents)

print("Les mots ont été insérés dans la base de données MongoDB.")
