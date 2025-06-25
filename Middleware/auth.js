module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const apiKey = authHeader && authHeader.split(' ')[1]; 

  if (!apiKey || apiKey !== '12345') {
    return res.status(401).json({ error: 'Unauthorized - Invalid API Key' });
  }

  next();

};// This middleware checks for a valid API key in the request headers.
// If the key is missing or incorrect, it responds with a 401 Unauthorized status.