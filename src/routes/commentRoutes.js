const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Récupérer les commentaires d'un article
router.get('/article/:articleId', commentController.getArticleComments);

// Ajouter un commentaire
router.post('/', commentController.addComment);

module.exports = router;