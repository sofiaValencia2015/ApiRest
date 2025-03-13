const { response, request } = require('express')
const { Peliculas } = require('../models/mySqlPeliculas');
const { bdmysql } = require('../database/MySqlConnection');
const { body } = require('express-validator');


const peliculasGet = async (req, res = response) => {

    try {
        const unasPeliculas = await Peliculas.findAll();

        res.json({
            ok: true,
            data: unasPeliculas
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

const peliculaIdGet = async (req, res = response) => {

    const { id } = req.params;

    try {

        const unaPelicula = await Peliculas.findByPk(id);

        if (!unaPelicula) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una pelicula con el id: ' + id
            })
        }

        res.json({
            ok: true,
            data: unaPelicula
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

const peliculasComoGet = async(req = request, res = response) => {

    const { termino } = req.params;

    try {
        const [results,metadata] = await bdmysql.query(
            "SELECT nombre_pelicula, genero, duracion, idioma, anioEstreno " +
            " FROM peliculas" +
            " WHERE nombre_pelicula like '%" + termino + "%'" +
            " ORDER BY nombre_pelicula"
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


const peliculasPost = async (req, res = response) => {
 
    try {

        console.log(req.body);

        const { nombre_pelicula, genero, duracion, idioma, anioEstreno} = req.body;

        const pelicula = new Peliculas({ nombre_pelicula, genero, duracion, idioma, anioEstreno });
    
        const existePelicula = await Peliculas.findOne({ where: { nombre_pelicula: nombre_pelicula} });

        if (existePelicula) {
            return res.status(400).json({ok:false,
                msg: 'Ya existe un Heroe llamado: ' + nombre_pelicula
            })
        }

        // Guardar en BD
        newPelicula = await pelicula.save();

        //console.log(newHeroe.null);
        //Ajusta el Id del nuevo registro al Heroe
        pelicula.id = newPelicula.null;

        res.json({ok:true,
            mensaje:'Pelicula Creado',
            data:pelicula
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}



const peliculaPut = async (req, res = response) => {

    const { id } = req.params;
    const { body} = req;
   //const { _id, password, google, correo, ...resto } = req.body;


    console.log(id);
    console.log(body);


    //var condition = { where :{id: id} };


    try {


        const pelicula = await Peliculas.findByPk(id);


        if (!pelicula) {
            return res.status(404).json({ok:false,
                msg: 'No existe una película con el id: ' + id
            })
        }

        console.log(body)
       
        await pelicula.update(body);


        res.json({ok:true,
                 msg:"Pelicula actualizado",
                 data:pelicula});
   

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}

const peliculaDelete = async (req, res = response) => {
    const { id } = req.params;

    console.log(id);
 
    //var condition = { where :{id: id} };

    try {


        const pelicula = await Peliculas.findByPk(id);
        //const usuarioAutenticado = req.usuario;


        if (!pelicula) {
            return res.status(404).json({ok:false,
                msg: 'No existe una pelicula con el id: ' + id
            })
        }

        //Borrado Logico.
        //await heroe.update({estado:false});

        //Borrado de la BD
        await pelicula.destroy();

        res.json({ok:true,
            msj:"Pelicula Borrada...",
            data: pelicula
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
    peliculasGet,
    peliculaIdGet,
    peliculasComoGet,
    peliculasPost,
    peliculaPut,
    peliculaDelete
}