const articleModel = require('../models/articleModel');

// GET /api/articles — Récupérer tous les articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleModel.getAll();
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des articles." });
  }
};

// GET /api/articles/:id — Récupérer un article
exports.getOneArticle = async (req, res) => {
  try {
    const article = await articleModel.getById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }
    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// POST /api/articles — Créer un article (protégé)
exports.addArticle = async (req, res) => {
  try {
    const { titre, contenu, slug, image_url, categorie_id } = req.body;

    // Validation : titre et contenu sont obligatoires
    if (!titre || !contenu) {
      return res.status(400).json({ message: "Le titre et le contenu sont obligatoires." });
    }

    // On récupère l'id de l'utilisateur connecté depuis le token
    const user_id = req.userId;

    const id = await articleModel.create({ titre, contenu, slug, image_url, categorie_id, user_id });
    res.status(201).json({ id, message: "Article créé !" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'article." });
  }
};

// PUT /api/articles/:id — Modifier un article (protégé)
exports.updateArticle = async (req, res) => {
  try {
    const { titre, contenu, slug, image_url, categorie_id } = req.body;

    if (!titre || !contenu) {
      return res.status(400).json({ message: "Le titre et le contenu sont obligatoires." });
    }

    await articleModel.update(req.params.id, { titre, contenu, slug, image_url, categorie_id });
    res.json({ message: "Article mis à jour." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la modification." });
  }
};

// DELETE /api/articles/:id — Supprimer un article (protégé)
exports.deleteArticle = async (req, res) => {
  try {
    await articleModel.remove(req.params.id);
    res.json({ message: "Article supprimé." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la suppression." });
  }
};