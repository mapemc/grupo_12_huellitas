const db = require('../database/models');

const adminMiddleware = async (req, res, next) => {
    try {
        const loggedUser = req.session.user;
        if (loggedUser) {
            const user = await db.User.findOne({ where: { id: loggedUser.id } });
            if (user && user.category === "Admin") {
                next();
            } else {
                res.render('notFound.ejs');
            }
        } else {
            res.render('notFound.ejs');
        }
    } catch (error) {
        console.error("Error en el middleware adminMiddleware:", error);
        next(error);
    }
};

module.exports = adminMiddleware;
