const db = require("../../db");

class Pago {

    static async registrarPago(id_usuario, fecha_pago, fecha_vencimiento){

        await db.query(
            `INSERT INTO Pago (id_usuario, fecha_pago, fecha_vencimiento, estado)
             VALUES (?, ?, ?, 'Vigente')`,
            [id_usuario, fecha_pago, fecha_vencimiento]
        );

    }

    static async obtenerPagoActivo(id_usuario){

        const [rows] = await db.query(
            `SELECT * FROM Pago
             WHERE id_usuario = ?
             ORDER BY fecha_vencimiento DESC
             LIMIT 1`,
            [id_usuario]
        );

        return rows[0];
    }

    static async actualizarEstados(){

        await db.query(
            `UPDATE Pago 
             SET estado='Vencido'
             WHERE fecha_vencimiento < CURDATE()`
        );

    }

    static async listar(){

        const [rows] = await db.query(
            `SELECT p.*, u.nombre 
             FROM Pago p
             JOIN Usuario u ON p.id_usuario = u.id_usuario`
        );

        return rows;
    }

    static async buscarPorIdentificacion(identificacion){

    const [rows] = await db.query(
        `SELECT p.*, u.nombre, u.identificacion
         FROM Pago p
         JOIN Usuario u ON p.id_usuario = u.id_usuario
         WHERE u.identificacion = ?
         ORDER BY p.fecha_vencimiento DESC`,
        [identificacion]
    );

    return rows;
    }

    static async actualizar(id, fecha_pago, fecha_vencimiento){

    await db.query(
        `UPDATE Pago 
         SET fecha_pago=?, fecha_vencimiento=?, estado='Vigente'
         WHERE id_pago=?`,
        [fecha_pago, fecha_vencimiento, id]
    );

    }

}

module.exports = Pago;