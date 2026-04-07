const db = require('../config/db');

// GET /api/categories — Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categories');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur catégories" });
    }
};

// POST /api/categories — Ajouter une catégorie (optionnel)
exports.addCategory = async (req, res) => {
    try {
        const { nom } = req.body;

        if (!nom) {
            return res.status(400).json({ message: "Le nom de la catégorie est obligatoire." });
        }

        const [result] = await db.query(
            'INSERT INTO categories (nom) VALUES (?)',
            [nom]
        );

        res.status(201).json({ id: result.insertId, nom, message: "Catégorie créée !" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de l'ajout de la catégorie." });
    }
};