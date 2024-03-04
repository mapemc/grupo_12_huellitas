const db = require('../database/models');

const rememberMiddleware = async (req, res, next) => {
    try {
        if (req.cookies && req.cookies.remember && req.session.user === undefined) {
            const userEmail = req.cookies.remember;
            const user = await db.User.findOne({ where: { email: userEmail } });
            req.session.user = user;
        }
        next();
    } catch (error) {
        console.error("Error en el middleware rememberMiddleware:", error);
        next(error);
    }
};

module.exports = rememberMiddleware;
