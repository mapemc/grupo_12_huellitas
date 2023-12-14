const express = require("express");
const app = express();
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

/* rutas */
const mainRouter = require("./routes/mainRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");

app.use(express.static("public"));


app.use("/", mainRouter);
app.use("/usuarios", userRouter);
app.use("/productos", productRouter)



app.listen(3456, () => {
    console.log('Servidor corriendo en http://localhost:3456');
})


