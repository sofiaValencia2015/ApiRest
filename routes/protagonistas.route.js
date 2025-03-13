const { Router } = require('express');

const { protagonistasGet, 
    protagonistaIdGet,
    protagonistaComoGet,
    protagonistaPost,
    protagonistaPut,
    protagonistaDelete
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch 
} = require('../controllers/protagonistas.controller');

const router = Router();

router.get('/', protagonistasGet);

router.get('/:id', protagonistaIdGet);

router.get('/como/:termino', protagonistaComoGet);

//Para insertar un Heroe en la BD
router.post('/', protagonistaPost);

//Para modificar un Heroe en la BD
router.put('/:id', protagonistaPut);

//Para eliminar un Heroe de la BD
router.delete('/:id', protagonistaDelete);

//router.patch('/', usuariosPatch);

module.exports = router;