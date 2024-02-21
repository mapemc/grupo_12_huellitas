const {check} = require('express-validator');

const validationsLoginUser = [
    check('email')
        .isEmail()
        .withMessage('Email no registrado')
        .bail(),
    check('password')
        .notEmpty()
        .withMessage('La contraseña es incorrecta')
];

module.exports = validationsLoginUser