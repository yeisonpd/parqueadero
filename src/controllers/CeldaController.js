const Celda = require("../models/Celda");

class CeldaController {

    static async crear(req, res){
        const { numero } = req.body;
        await Celda.crear(numero);
        res.json({mensaje:"Celda creada"});
    }

    static async listar(req, res){
        const data = await Celda.obtenerTodas();
        res.json(data);
    }

    static async actualizar(req,res){
        const { id } = req.params;
        const { numero, estado } = req.body;

        await Celda.actualizar(id, numero, estado);

        res.json({mensaje:"Celda actualizada"});
    }

    static async eliminar(req,res){
        const { id } = req.params;

        await Celda.eliminar(id);

        res.json({mensaje:"Celda eliminada"});
    }

}

module.exports = CeldaController;