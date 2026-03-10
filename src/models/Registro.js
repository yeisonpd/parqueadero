const db = require("../../db");

class Registro {

    static async registrarEntrada(idVehiculo) {
        const [result] = await db.query(
            "INSERT INTO Registro (id_vehiculo, fecha_entrada) VALUES (?, NOW())",
            [idVehiculo]
        );
        return result.insertId;
    }

    static async registrarSalida(idVehiculo, observacion) {
        const [result] = await db.query(
            `UPDATE Registro 
             SET fecha_salida = NOW(), observacion = ?
             WHERE id_vehiculo = ? AND fecha_salida IS NULL`,
            [observacion, idVehiculo]
        );
        return result.affectedRows;
    }

    static async obtenerHistorial() {
        const [rows] = await db.query(
            `SELECT v.placa, r.fecha_entrada, r.fecha_salida, r.observacion
             FROM Registro r
             JOIN Vehiculo v ON r.id_vehiculo = v.id_vehiculo
             ORDER BY r.fecha_entrada DESC`
        );
        return rows;
    }

    static async buscarPorPlaca(placa) {

        const [rows] = await db.query(
            `SELECT v.placa, r.fecha_entrada, r.fecha_salida, r.observacion
            FROM Registro r
            JOIN Vehiculo v ON r.id_vehiculo = v.id_vehiculo
            WHERE v.placa = ?
            ORDER BY r.fecha_entrada DESC`,
            [placa]
        );
        return rows;

    }

    static async vehiculoDentro(idVehiculo) {

        const [rows] = await db.query(
            `SELECT * 
            FROM Registro
            WHERE id_vehiculo = ?
            AND fecha_salida IS NULL`,
            [idVehiculo]
        );

        return rows.length > 0;

    }

}

module.exports = Registro;