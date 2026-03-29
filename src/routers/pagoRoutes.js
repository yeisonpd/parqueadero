const express = require("express");
const router = express.Router();

const PagoController = require("../controllers/PagoController");

router.post("/pago", PagoController.crear);
router.get("/pagos", PagoController.listar);
router.get("/pagos/:identificacion", PagoController.buscarPorIdentificacion);
router.put("/pago/:id", PagoController.actualizar);

module.exports = router;