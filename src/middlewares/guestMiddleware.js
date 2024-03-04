function guestMiddleware(req, res, next){
    if(req.session.user){
        console.log("Guest middleware: el usuario ya está logueado");
        console.log("Usuario: ",req.session.user);
        console.log("Continúa a la página de perfil"); 
        return res.redirect(`/users/editProfile/${req.session.user.username}`)
    }else{
        console.log("Guest middleware: el usuario no está logueado"); 
        console.log("Usuario: ",req.session.user);
        console.log("Continúa a la página de login o register"); 
        next()
    }
}

module.exports = guestMiddleware;