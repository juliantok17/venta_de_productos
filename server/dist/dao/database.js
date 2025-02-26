import mongoose from "mongoose";
mongoose.connect("")
    .then(() => {
    console.log("Conectado a MongoDB");
})
    .catch((error) => {
    console.log("No se pudo conectar a MongoDB: ", error);
});
