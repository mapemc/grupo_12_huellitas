function authMiddleware(req, res, next){

    if(req.session.user != undefined){
        console.log("Auth middleware: en session se guardó el siguiente User to Log In: ");
        console.log(req.session.user);
        console.log("Continúa la ejecución de la ruta seleccionada");
        next();
    }else{ 
        console.log("Auth middleware: el usuario no está logueado"); 
        console.log("Usuario: ",req.session.user);
        console.log("Continúa a la página de login");  
        return res.redirect('/users/login')
    }
}

module.exports = authMiddleware;