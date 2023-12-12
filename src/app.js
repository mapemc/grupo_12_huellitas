const express = require("express");
const app = express();


/* rutas */
const mainRouter = require("./routes/mainRouter.js");
const userRouter = require("./routes/userRouter.js");
const productRouter = require("./routes/productRouter.js");

app.use(express.static("public"));


app.use("/", mainRouter);
app.use("/usuarios", userRouter);
app.use("/productos", productRouter)



app.listen(3456, () => {
    console.log('Servidor corriendo en http://localhost:3456');
})


