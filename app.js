const express = require('express')
const path = require('path')
const app = express()




app.listen(3000, () => {
    console.log('Servidor Corriendo');
})
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})

