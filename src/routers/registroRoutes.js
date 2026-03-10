const express = require("express");
const router = express.Router();

const RegistroController = require("../controllers/RegistroController");

// Registrar entrada
router.post("/entrada", RegistroController.registrarEntrada);

// Registrar salida
router.post("/salida", RegistroController.registrarSalida);

// Ver historial
router.get("/historial", RegistroController.historial);

// consultar historial
router.get("/historial/placa", RegistroController.buscarHistorial);

module.exports = router;