const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes publiques — tout le monde peut lire
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getOneArticle);

// Routes protégées — token obligatoire
router.post('/', authMiddleware, articleController.addArticle);
router.put('/:id', authMiddleware, articleController.updateArticle);
router.delete('/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;