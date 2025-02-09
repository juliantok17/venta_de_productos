import express from "express";
const app = express();
const PUERTO = 5000;
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Rutas
app.get('/', (req, res) => {
    res.send("Bienvenido grupo Baldi's Code Factory!");
});
//Listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: http://localhost:${PUERTO}`);
});
