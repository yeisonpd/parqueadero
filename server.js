const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const registroRoutes = require("./src/routers/registroRoutes");


app.use(express.static(path.join(__dirname,"src/views")));

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"src/views/index.html"));
});

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use("/api", registroRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});