const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    // Vérifier que le header Authorization est présent
    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant. Connecte-toi d'abord." });
    }

    // Le token est de la forme "Bearer montoken"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Format du token invalide." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();

  } catch (err) {
    res.status(401).json({ message: "Token invalide ou expiré. Reconnecte-toi." });
  }
};