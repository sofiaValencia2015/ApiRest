const { response, request } = require('express')
const { Protagonistas } = require('../models/mySqlProtagonistas');
const { Peliculas } = require('../models/mySqlPeliculas');
const { Heroes } = require('../models/mySqlHeroes');

const { bdmysql } = require('../database/MySqlConnection');


const { body } = require('express-validator');

const protagonistasGet = async (req, res = response) => {

    try {
        const unosProtagonistas = await Protagonistas.findAll();

        res.json({
            ok: true,
            data: unosProtagonistas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }
}

const protagonistaIdGet = async (req, res = response) => {

    const { id } = req.params;

    try {

        const unosProtagonistas = await Protagonistas.findByPk(id);

        if (!unosProtagonistas) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un protagonista con el id: ' + id
            })
        }

        res.json({
            ok: true,
            data: unosProtagonistas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

    /*
    const query = req.query;

    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page=1, limit=10} = req.query;

    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'get API - Controller',
        query,
        q,
        nombre,
        apikey,
        page,
        limit
       })

      */
}

const protagonistaComoGet = async(req = request, res = response) => {

    const { termino } = req.params;

    try {
        const [results,metadata] = await bdmysql.query(
            "SELECT rol, escenas_participadas " +
            " FROM protagonistas" +
            " WHERE rol like '%" + termino + "%'" +
            " ORDER BY rol"
        );

        res.json({ok:true,
            data: results,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error

        });
    }
};

const protagonistaPost = async (req, res = response) => {
    try {

        console.log(req.body);
        const { idHeroe, idPelicula, rol, escenas_participadas, papel, pago} = req.body;
        const protagonistas = new Protagonistas({  idHeroe, idPelicula, rol, escenas_participadas, papel, pago});    
        const existeprotagonista = await Protagonistas.findOne({ where: { rol: rol} });

        // Validar que exista el heroe por medio del id
        const heroe = await Heroes.findByPk(idHeroe);
        if (!heroe) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un héroe con id ${idHeroe}`
            });
        }

        // Validar que exista la pelicula por medio del id
        const pelicula = await Peliculas.findByPk(idPelicula);
        if (!pelicula) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una película con id ${idPelicula}`
            });
        }

        if (existeprotagonista) {
            return res.status(400).json({ok:false,
                msg: 'Ya existe un protagonista llamado: ' + rol
            })
        }
        
        // Crear el protagonista
        const protagonista = new Protagonistas({
            idHeroe,
            idPelicula,
            rol,
            escenas_participadas,
            papel,
            pago
        });

        // Guardar en BD
        newProtagonista = await protagonista.save();

        res.json({
            ok: true,
            mensaje: 'Protagonista Creado',
            data: newProtagonista
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

const protagonistaPut = async (req, res = response) => {

    const { id } = req.params;
    const { body} = req;
   //const { _id, password, google, correo, ...resto } = req.body;


    console.log(id);
    console.log(body);


    //var condition = { where :{id: id} };


    try {


        const protagonista = await Protagonistas.findByPk(id);


        if (!protagonista) {
            return res.status(404).json({ok:false,
                msg: 'No existe un protagonista con el id: ' + id
            })
        }

        console.log(body)
       
        await protagonista.update(body);


        res.json({ok:true,
                 msg:"Protagonista actualizado",
                 data:protagonista});
   

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}

const protagonistaDelete = async (req, res = response) => {
    const { id } = req.params;

    console.log(id);
 
    //var condition = { where :{id: id} };

    try {


        const protagonista = await Protagonistas.findByPk(id);
        //const usuarioAutenticado = req.usuario;


        if (!protagonista) {
            return res.status(404).json({ok:false,
                msg: 'No existe un protagonista con el id: ' + id
            })
        }

        //Borrado Logico.
        //await heroe.update({estado:false});

        //Borrado de la BD
        await protagonista.destroy();

        res.json({ok:true,
            msj:"protagonista Borrado...",
            data: protagonista
            //usuario:usuario,
            //autenticado:usuarioAutenticado
        });
   


    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })


    }
}



module.exports = {
    protagonistasGet,
    protagonistaIdGet,
    protagonistaComoGet,
    protagonistaPost,
    protagonistaPut,
    protagonistaDelete
}