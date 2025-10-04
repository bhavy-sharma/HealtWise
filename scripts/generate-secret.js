const crypto = require('crypto');

// Generate a random secret key
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const secret = generateJWTSecret();
console.log('Your JWT Secret:');
console.log(secret);
console.log('\nCopy this to your .env.local file as JWT_SECRET=' + secret);