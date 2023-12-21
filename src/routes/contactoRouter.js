const express = require('express');
const router = express.Router();

// Suponiendo que tienes un controlador llamado contactoController
const contactoController = require('../controllers/contactoController');

// Ruta para enviar un mensaje de contacto
router.post('/enviar', (req, res) => {
    const { nombre, email, mensaje } = req.body;
    
    // Aquí puedes agregar lógica para validar los datos entrantes

    // Llama al método correspondiente en el controlador
    contactoController.enviarMensaje(nombre, email, mensaje)
        .then(respuesta => {
            res.status(200).json({ mensaje: 'Mensaje enviado con éxito', data: respuesta });
        })
        .catch(error => {
            res.status(500).json({ mensaje: 'Error al enviar el mensaje', error });
        });
});

module.exports = router;
