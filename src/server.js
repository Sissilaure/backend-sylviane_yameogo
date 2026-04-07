require('dotenv').config();  // ← TOUTE PREMIÈRE LIGNE, avant tout le reste
const app = require('./app');
const config = require('./config/database');

const PORT = config.server.port;

app.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(`Serveur démarré sur : http://localhost:${PORT}`);
    console.log(`==========================================`);
});