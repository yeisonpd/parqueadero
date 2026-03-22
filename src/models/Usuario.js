const db = require("../../db");

class Usuario {

    static async crearOReactivar(nombre, identificacion, telefono) {

        // 🔍 Buscar si existe
        const [rows] = await db.query(
            "SELECT * FROM Usuario WHERE identificacion = ?",
            [identificacion]
        );

        if (rows.length > 0) {

            const usuario = rows[0];

            // 🔄 Reactivar y actualizar
            await db.query(
                `UPDATE Usuario 
                SET nombre=?, telefono=?, estado=1
                WHERE id_usuario=?`,
                [nombre, telefono, usuario.id_usuario]
            );

            return usuario.id_usuario;

        } else {

            // ➕ Crear nuevo
            const [result] = await db.query(
                `INSERT INTO Usuario (nombre, identificacion, telefono, estado)
                VALUES (?, ?, ?, 1)`,
                [nombre, identificacion, telefono]
            );

            return result.insertId;
        }
    }

    static async obtenerTodos() {

        const [rows] = await db.query(
            "SELECT * FROM Usuario WHERE estado = 1"
        );

        return rows;
    }

    static async buscarPorIdentificacion(identificacion) {

        const [rows] = await db.query(
            "SELECT * FROM Usuario WHERE identificacion = ?",
            [identificacion]
        );

        return rows[0];
    }

    static async actualizar(id, nombre, identificacion, telefono) {

        await db.query(
            `UPDATE Usuario 
            SET nombre=?, identificacion=?, telefono=? 
            WHERE id_usuario=?`,
            [nombre, identificacion, telefono, id]
        );
    }

    static async desactivar(id) {

        await db.query(
            "UPDATE Usuario SET estado = 0 WHERE id_usuario=?",
            [id]
        );
    }

}

module.exports = Usuario;