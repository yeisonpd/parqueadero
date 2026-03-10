const Vehiculo = require("../models/Vehiculo");
const Registro = require("../models/Registro");

class RegistroController {

    static async registrarEntrada(req, res) {
        try {

            const { placa } = req.body;

            let vehiculo = await Vehiculo.buscarPorPlaca(placa);

            let idVehiculo;

            if (!vehiculo) {
                idVehiculo = await Vehiculo.crearVehiculo(placa);
            } else {
                idVehiculo = vehiculo.id_vehiculo;
            }

            const dentro = await Registro.vehiculoDentro(idVehiculo);

            if (dentro) {
                return res.status(400).json({
                mensaje: "El vehículo ya se encuentra dentro del parqueadero"
                });
            }
            const idRegistro = await Registro.registrarEntrada(idVehiculo);

            res.json({
                mensaje: "Entrada registrada correctamente",
                idRegistro
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al registrar entrada" });
        }
    }


    static async registrarSalida(req, res) {
        try {

            const { placa, observacion } = req.body;

            const vehiculo = await Vehiculo.buscarPorPlaca(placa);

            if (!vehiculo) {
                return res.status(404).json({
                    mensaje: "Vehículo no encontrado"
                });
            }

            const resultado = await Registro.registrarSalida(
                vehiculo.id_vehiculo,
                observacion
            );

            if (resultado === 0) {
                return res.status(400).json({
                    mensaje: "No hay registro de entrada abierto"
                });
            }

            res.json({
                mensaje: "Salida registrada correctamente"
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al registrar salida" });
        }
    }


    static async historial(req, res) {
        try {

            const registros = await Registro.obtenerHistorial();

            res.json(registros);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener historial" });
        }
    }

    static async buscarHistorial(req, res) {

        try {

            const { placa } = req.query;

            const registros = await Registro.buscarPorPlaca(placa);

            res.json(registros);

        } catch (error) {

            console.error(error);

            res.status(500).json({ error: "Error al buscar historial" });

        }

    }

}

module.exports = RegistroController;