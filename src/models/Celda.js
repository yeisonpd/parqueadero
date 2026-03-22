const db = require("../../db");

class Celda {

    // 🔍 Buscar celda libre
    static async obtenerCeldaLibre() {

        const [rows] = await db.query(
            "SELECT * FROM Celda WHERE estado = 'libre' LIMIT 1"
        );

        return rows[0];
    }

    // 🔒 Marcar como ocupada
    static async ocuparCelda(id_celda) {

        await db.query(
            "UPDATE Celda SET estado = 'ocupada' WHERE id_celda = ?",
            [id_celda]
        );

    }

    // 🔓 Liberar celda
    static async liberarCelda(id_celda) {

        await db.query(
            "UPDATE Celda SET estado = 'libre' WHERE id_celda = ?",
            [id_celda]
        );

    }

    // Crear
    static async crear(numero) {
        await db.query(
            "INSERT INTO Celda (numero, estado) VALUES (?, 'libre')",
            [numero]
        );
    }

    // Listar
    static async obtenerTodas() {
        const [rows] = await db.query("SELECT * FROM Celda");
        return rows;
    }

    // Actualizar
    static async actualizar(id, numero, estado) {
        await db.query(
            "UPDATE Celda SET numero=?, estado=? WHERE id_celda=?",
            [numero, estado, id]
        );
    }

    // Eliminar
    static async eliminar(id) {
        await db.query(
            "DELETE FROM Celda WHERE id_celda=?",
            [id]
        );
    }

}

module.exports = Celda;