const express = require("express");
const router = express.Router();

const CeldaController = require("../controllers/CeldaController");

router.post("/celda", CeldaController.crear);
router.get("/celdas", CeldaController.listar);
router.put("/celda/:id", CeldaController.actualizar);
router.delete("/celda/:id", CeldaController.eliminar);

module.exports = router;