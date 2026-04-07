const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

// Tout le monde peut voir les catégories
router.get('/', categoryController.getAllCategories);

// Seul un utilisateur connecté peut ajouter une catégorie
router.post('/', authMiddleware, categoryController.addCategory);

module.exports = router;