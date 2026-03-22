const Usuario = require("../models/Usuario");

class UsuarioController {

    static async crearUsuario(req, res) {
        try {

            const { nombre, identificacion, telefono } = req.body;

            const id = await Usuario.crearOReactivar(
                nombre,
                identificacion,
                telefono
            );

            res.json({
                mensaje: "Usuario creado correctamente",
                id_usuario: id
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: "Error al crear usuario"
            });

        }
    }

    static async listarUsuarios(req, res) {
        try {

            const usuarios = await Usuario.obtenerTodos();

            res.json(usuarios);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: "Error al obtener usuarios"
            });

        }
    }

    static async actualizarUsuario(req, res) {
        try {

            const { id } = req.params;
            const { nombre, identificacion, telefono } = req.body;

            await Usuario.actualizar(id, nombre, identificacion, telefono);

            res.json({ mensaje: "Usuario actualizado" });

        } catch (error) {
            res.status(500).json({ error: "Error al actualizar" });
        }
    }

    static async eliminarUsuario(req, res) {
        try {

            const { id } = req.params;

            await Usuario.desactivar(id);

            res.json({ mensaje: "Usuario eliminado" });

        } catch (error) {
            res.status(500).json({ error: "Error al eliminar" });
        }
    }
}

module.exports = UsuarioController;