const crypto = require('crypto');

// Générer une clé secrète aléatoire de 32 octets (256 bits)
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Secret Key:', secretKey);
// secret Key: be8e4641a7463b16610f04f8646ea8197f9c0972b47a60cc52939526231e27e1