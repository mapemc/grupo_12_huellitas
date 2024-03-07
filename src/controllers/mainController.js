const path = require("path");


const mainController ={
    index: (req, res) =>{
        const loggedInUser = req.session.user; 
        res.render("index.ejs", { user: loggedInUser });
    },
    enviarMensaje: (nombre, email, mensaje) =>{
        return new Promise((resolve, reject) => {
            // Aquí puedes integrar la lógica para enviar el mensaje, como enviar un correo electrónico o guardar en una base de datos

            // Por ahora, solo imprimiremos el mensaje en la consola
            console.log('Mensaje recibido de:', nombre);
            console.log('Email:', email);
            console.log('Mensaje:', mensaje);

            // Simular una operación exitosa
            resolve({ nombre, email, mensaje });
        })
    },
    contact: (req, res) =>{
        res.render("contact.ejs");
    },
};
module.exports = mainController;