const {check} = require('express-validator');
const path = require('path');

const validationsEditProduct = [
    check('name')
       /*  .notEmpty() */
        .isLength({ min: 5 })
        .withMessage('El nombre debe tener al menos 5 caracteres'),
    check('description')
        .isLength({ min: 20 })
        .withMessage('La descripción debe tener al menos 20 caracteres'),
    check('price')
        .custom(value => {
          // Verificar que el número tenga parte decimal
          if (!value.toString().includes('.')) {
          throw new Error('El precio debe ser un número decimal');
          }
          return true;
        })
        .withMessage('El precio debe ser un número decimal'),
    check('stock')       
        .isInt({ min: 1 })
        .withMessage('El stock debe ser mayor o igual a 1'),
    check('photo'). custom((value, { req }) =>{
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.gif', 'jpeg'];

      if(!file){
        throw new Error('Sube una imagen del producto');
      }else {
        let fileExtension = path.extname(file.originalname.toLowerCase());
        if(!acceptedExtensions.includes(fileExtension)){
          throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(',')}`);
      }
      }
      return true
    })
];

module.exports = validationsEditProduct

