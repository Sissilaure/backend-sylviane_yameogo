const commentModel = require('../models/commentModel');

// GET /api/comments/article/:articleId — Commentaires d'un article
exports.getArticleComments = async (req, res) => {
  try {
    const comments = await commentModel.getByArticle(req.params.articleId);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des commentaires." });
  }
};

// POST /api/comments — Ajouter un commentaire
exports.addComment = async (req, res) => {
  try {
    const { auteur, contenu, article_id } = req.body;

    // Validation
    if (!contenu || !article_id) {
      return res.status(400).json({ message: "Le contenu et l'article_id sont obligatoires." });
    }

    const id = await commentModel.create({
      auteur: auteur || 'Anonyme',
      contenu,
      article_id
    });

    res.status(201).json({ id, auteur: auteur || 'Anonyme', contenu, article_id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible d'ajouter le commentaire." });
  }
};