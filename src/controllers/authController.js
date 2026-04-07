require('dotenv').config();   // ← ajoute cette ligne
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// POST /api/auth/register — Créer un compte
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    const existing = await userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create(username, email, hashedPassword);

    res.status(201).json({ message: "Compte créé avec succès !" });

  } catch (err) {
    console.error("Erreur register :", err);
    res.status(500).json({ error: "Erreur lors de l'inscription.", detail: err.message });
  }
};

// POST /api/auth/login — Se connecter
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe obligatoires." });
    }

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, username: user.username });

  } catch (err) {
    console.error("Erreur login :", err);
    res.status(500).json({ error: "Erreur login.", detail: err.message });
  }
};