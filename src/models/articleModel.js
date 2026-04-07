const db = require('../config/db');

const getAll = async () => {
    const [rows] = await db.query('SELECT a.*, c.nom as categorie_nom FROM articles a LEFT JOIN categories c ON a.categorie_id = c.id');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM articles WHERE id = ?', [id]);
    return rows[0];
};

const create = async (data) => {
    const { titre, slug, contenu, image_url, user_id, categorie_id } = data;
    const sql = 'INSERT INTO articles (titre, slug, contenu, image_url, user_id, categorie_id) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [titre, slug, contenu, image_url, user_id, categorie_id]);
    return result.insertId;
};

const update = async (id, data) => {
    const { titre, contenu, image_url, categorie_id } = data;
    const sql = 'UPDATE articles SET titre = ?, contenu = ?, image_url = ?, categorie_id = ? WHERE id = ?';
    return await db.query(sql, [titre, contenu, image_url, categorie_id, id]);
};

const remove = async (id) => {
    return await db.query('DELETE FROM articles WHERE id = ?', [id]);
};

module.exports = { getAll, getById, create, update, remove };