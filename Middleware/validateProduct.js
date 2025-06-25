module.exports = function (req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  if (!name || typeof name !== 'string'  || !description == undefined || !price || typeof price !== 'number' || !category === undefined || !inStock === undefined || typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  next();
};
// This middleware validates the product data in the request body.
// It checks for the presence and type of required fields: name (string), description (string