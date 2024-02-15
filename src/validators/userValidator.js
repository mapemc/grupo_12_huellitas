/* const { check } = require('express-validator');
const { ValidatorsImpl } = require('express-validator/src/chain/validators-impl');

class CustomValidatorsImpl extends ValidatorsImpl {
    withMessage(message) {
        if (this.lastValidator) {
            this.lastValidator.message = message;
        }
        return this.chain;
    }
}

const validationsRegister = [
    check('username').notEmpty().trim().withMessage('El campo no debe quedar vacío').bail(),
    check('email').notEmpty().trim().isEmail().withMessage('Debe ser un email válido').bail(),
    check('password').notEmpty().withMessage('El campo no debe quedar vacío').bail(),
    check('password').isStrongPassword({minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('El campo debe contener al menos 6 cáracteres: 1 minúscula, 1 mayúscula, 1 número, 1 símbolo').bail(),
    check('phone').trim().isInt().withMessage('Debe ser un número válido'),
    check('address').trim().withMessage('Debe ser un email válido'),
    check('postal').trim().isEmail().withMessage('Debe ser un email válido'),
];

module.exports = {
    validationsRegister,
    CustomValidatorsImpl
};
*/