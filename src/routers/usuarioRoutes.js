const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/UsuarioController");

// Crear usuario
router.post("/usuario", UsuarioController.crearUsuario);

// Listar usuarios
router.get("/usuarios", UsuarioController.listarUsuarios);

//actualizar
router.put("/usuario/:id", UsuarioController.actualizarUsuario);

//eliminar
router.delete("/usuario/:id", UsuarioController.eliminarUsuario);

module.exports = router;