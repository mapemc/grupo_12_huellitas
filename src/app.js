const express = require('express')
const path = require('path')
const app = express()


app.listen(3456, () => {
    console.log('Servidor corriendo en http://localhost:3456');
})
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})

app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'))
})

app.use(express.static("public"));