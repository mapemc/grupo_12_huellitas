function authMiddleware(req, res, next){
    console.log("Middleware de autenticación ejecutándose...");
    if(req.session.user !== undefined) {
        /*console.log("Usuario autenticado autimdw:", req.session.user);*/
        next();
    } else {
        /*console.log("Usuario no autenticado autimdw");*/
        res.redirect('/users/login');
    }
}

module.exports = authMiddleware;