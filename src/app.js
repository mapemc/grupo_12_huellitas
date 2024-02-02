/////////REQUIRES////////////
const express = require("express");
const path = require("path");
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE

/////////EXPRESS//////////
const app = express();


/////////////////MIDDLEWARES//////////////
app.use(express.urlencoded({ extended: false })); // Para tomar los datos del body
app.use(express.json()); // Para tomar los datos del body
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE

///////////TEMPLATE ENGINES//////////
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));


/* rutas */
const mainRouter = require("./routes/mainRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const contactRouter = require("./routes/contactRouter");


app.use(express.static("public"));


app.use("/", mainRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/contact", contactRouter);

/*Not found*/
/*app.use((req, res, next) => {res.status(404).render('notFound')})
/*Error multer*/

// * Servidor *// 
app.listen(3456, () => {
    console.log('Servidor corriendo en http://localhost:3456');
})


