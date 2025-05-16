const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
console.log("Secret Key:", SECRET_KEY);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  console.log("Token:", token);

  if (!token) return res.status(401).json({ error: 'Access token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error("JWT verification failed:", err.message); // <--- THIS IS CRUCIAL
      return res.status(403).json({ error: 'Invalid token' });
    }
  
    console.log("Decoded user object:", user);
    req.userId = user.userId;
    next();
  });
};

module.exports = authenticateToken;
