const express = require("express");
const app = express();
const router = express.Router();


const mainController = require("../controllers/mainController.js");

router.get("/", mainController.index);

router.get('/pruebaSession',function(req,res){
    if(req.session.numeroVisitas== undefined){
        req.session.numeroVisitas = 0
    }
    req.session.numeroVisitas++
    res.send('Session tiene el numero: ' + req.session.numeroVisitas)

})

// Suponiendo que tienes un controlador llamado contactoController
// Ruta para enviar un mensaje de contacto
router.post('/enviar', (req, res) => {
    const { nombre, email, mensaje } = req.body;
    
    // Aquí puedes agregar lógica para validar los datos entrantes

    // Llama al método correspondiente en el controlador
    mainController.enviarMensaje(nombre, email, mensaje)
        .then(respuesta => {
            res.status(200).json({ mensaje: 'Mensaje enviado con éxito', data: respuesta });
        })
        .catch(error => {
            res.status(500).json({ mensaje: 'Error al enviar el mensaje', error });
        });
});
router.get("/contact", mainController.contact);

module.exports = router;