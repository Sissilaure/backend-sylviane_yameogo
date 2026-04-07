const db = require('../config/db');

// Récupérer tous les commentaires d'un article spécifique
const getByArticle = async (articleId) => {
    const [rows] = await db.query('SELECT * FROM comments WHERE article_id = ? ORDER BY date DESC', [articleId]);
    return rows;
};

// Ajouter un nouveau commentaire
const create = async (data) => {
    const { auteur, contenu, article_id } = data;
    const sql = 'INSERT INTO comments (auteur, contenu, article_id) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [auteur, contenu, article_id]);
    return result.insertId;
};

module.exports = { getByArticle, create };