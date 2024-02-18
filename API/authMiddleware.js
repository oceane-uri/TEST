
const authMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({
            message: 'Authorization token is required'
        });
    }

    // Vérifiez ici la validité du token (par exemple, avec jsonwebtoken)

    next();
};

module.exports = authMiddleware;
