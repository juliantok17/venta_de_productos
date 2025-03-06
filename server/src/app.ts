import express from "express"; 
import productoRouter from "./routes/producto.router.js";
//import "./dao/database.js";

const app = express(); 
const PUERTO = 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Rutas
app.get('/', (req, res) => {
    res.send("Bienvenido grupo Baldi's Code Factory!");
});

app.use("/api/products", productoRouter);

//Listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: http://localhost:${PUERTO}`);
})