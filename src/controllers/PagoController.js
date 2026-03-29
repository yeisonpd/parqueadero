const Pago = require("../models/Pago");
const Usuario = require("../models/Usuario");

class PagoController {

    static async crear(req,res){

        try {

            const { identificacion, fecha_pago, fecha_vencimiento } = req.body;

            // 🔍 Buscar usuario por identificación
            const usuario = await Usuario.buscarPorIdentificacion(identificacion);

            if (!usuario) {
                return res.status(400).json({
                    mensaje: "Usuario no registrado"
                });
            }

            // 🚫 Validar si está inactivo
            if (usuario.estado === 0) {
                return res.status(400).json({
                    mensaje: "Usuario desactivado"
                });
            }

            // 💾 Registrar pago con id_usuario
            await Pago.registrarPago(
                usuario.id_usuario,
                fecha_pago,
                fecha_vencimiento
            );

            res.json({ mensaje: "Pago registrado correctamente" });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: "Error al registrar pago"
            });

        }

    }


    static async listar(req,res){

        const data = await Pago.listar();

        res.json(data);

    }

    static async buscarPorIdentificacion(req,res){

    try {

        const { identificacion } = req.params;

        const pagos = await Pago.buscarPorIdentificacion(identificacion);

        if(pagos.length === 0){
            return res.json({mensaje:"No tiene pagos registrados"});
        }

        res.json(pagos);

    } catch (error){

        res.status(500).json({error:"Error al consultar pagos"});

    }

    }

    static async actualizar(req,res){

    try {

        const { id } = req.params;
        const { fecha_pago, fecha_vencimiento } = req.body;

        await Pago.actualizar(id, fecha_pago, fecha_vencimiento);

        res.json({mensaje:"Pago actualizado"});

    } catch (error){

        res.status(500).json({error:"Error al actualizar pago"});

    }

    }
}

module.exports = PagoController;