const db = require("../../db");

class Vehiculo {

    static async buscarPorPlaca(placa) {
        const [rows] = await db.query(
            "SELECT * FROM Vehiculo WHERE placa = ?",
            [placa]
        );
        return rows[0];
    }

    static async crearVehiculo(placa) {
        const [result] = await db.query(
            "INSERT INTO Vehiculo (placa) VALUES (?)",
            [placa]
        );
        return result.insertId;
    }

}

module.exports = Vehiculo;