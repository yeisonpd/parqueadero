const db = require("../../db");

class Vehiculo {

    static async buscarPorPlaca(placa) {
        const [rows] = await db.query(
            "SELECT * FROM Vehiculo WHERE placa = ?",
            [placa]
        );
        return rows[0];
    }

    static async crearVehiculo(placa, id_usuario) {
        const [result] = await db.query(
            "INSERT INTO Vehiculo (placa, id_usuario) VALUES (?, ?)",
            [placa, id_usuario]
        );
        return result.insertId;
    }

}

module.exports = Vehiculo;