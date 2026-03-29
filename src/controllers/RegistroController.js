const Vehiculo = require("../models/Vehiculo");
const Registro = require("../models/Registro");
const Usuario = require("../models/Usuario");
const Celda = require("../models/Celda");
const Pago = require("../models/Pago");

class RegistroController {

    static async registrarEntrada(req, res) {

        try {

            const { placa, identificacion } = req.body;

            // 🔍 Buscar usuario
            const usuario = await Usuario.buscarPorIdentificacion(identificacion);

            if (!usuario) {
                return res.status(404).json({
                    mensaje: "Usuario no registrado"
                });
            }

            // 🔍 Buscar vehículo
            let vehiculo = await Vehiculo.buscarPorPlaca(placa);

            let idVehiculo;

            if (!vehiculo) {
                idVehiculo = await Vehiculo.crearVehiculo(placa, usuario.id_usuario);
            } else {
                idVehiculo = vehiculo.id_vehiculo;
            }

            // 🚫 Validar si ya está dentro
            const dentro = await Registro.vehiculoDentro(idVehiculo);

            if (dentro) {
                return res.status(400).json({
                    mensaje: "El vehículo ya está dentro"
                });
            }

            
            // 🔄 actualizar estados automáticamente
            await Pago.actualizarEstados();

            // 🔍 validar pago
            const pago = await Pago.obtenerPagoActivo(usuario.id_usuario);

            if (!pago || pago.estado === "Vencido") {
                return res.status(400).json({
                    mensaje: "Usuario con pago vencido o sin pago"
                });
            }

            // 🔍 Buscar celda libre
            const celda = await Celda.obtenerCeldaLibre();

            if (!celda) {
                return res.status(400).json({
                    mensaje: "No hay celdas disponibles"
                });
            }

            // 🔒 Ocupar celda
            await Celda.ocuparCelda(celda.id_celda);

            // 🚗 Registrar entrada con celda
            const idRegistro = await Registro.registrarEntrada(
                idVehiculo,
                celda.id_celda
            );

            res.json({
                mensaje: `Entrada registrada - Celda asignada: ${celda.numero}`,
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
            // 🔍 Obtener registro activo
            const registro = await Registro.obtenerRegistroActivo(vehiculo.id_vehiculo);

            if (!registro) {
                return res.status(400).json({
                    mensaje: "No hay registro activo"
                });
            }
            // 🔓 Liberar celda
            await Celda.liberarCelda(registro.id_celda);


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
                mensaje: "Salida registrada correctamente y celda liberda"
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