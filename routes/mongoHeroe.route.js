const { Router } = require('express');


const { check} = require('express-validator')


//const Role = require('../models/role')


const {validarCampos} = require('../middlewares/validar-campos')


const {validarJWT} = require('../middlewares/validar-jwt')


const { existeHeroePorId } = require('../helpers/db-validators');
 
const { heroesGet,
        heroesPut,
        heroesPost,
        heroesDelete,
        heroesGetPorId
    } = require('../controllers/mongoHeroe.controller');


const router = Router();


router.get('/',[
    validarJWT, //Midlleware para el Tokens
    validarCampos
],
heroesGet );






router.put('/:id',[
    validarJWT, //Midlleware para el Tokens
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeHeroePorId),
    //check('rol').custom(esRoleValido),
    validarCampos
],heroesPut );

router.get('/:id', [
    validarJWT,
    check('id', 'No es un Id válido...').isMongoId(),
    check('id').custom(existeHeroePorId),
    validarCampos
], heroesGetPorId);



router.post('/',[
 //validarJWT, //Midlleware para el Tokens
 check('nombre','El nombre del héroe es obligatorio').not().isEmpty(),
 check('bio','El héroe debe tener biografía').not().isEmpty(),
 check('img','Creado sin imagen'),
 check('aparicion','El héroe debe tener una fecha de aparicion').not().isEmpty(),
 check('casa','El héroe debe tener una casa').not().isEmpty(),

 /*
 check('rol').custom( async (rol = '') => {
    const existeRol = await Role.findOne({ rol});
    if (!existeRol){  
        throw new Error(`El rol ${ rol} no existe en la Base de Datos...`);
    }
 }),
 */
 //check('rol').custom(esRoleValido),
 //check('correo').custom(existeEmail),
 validarCampos
]
,heroesPost );




router.delete('/:id',[
    validarJWT, //Midlleware para el Tokens    
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeHeroePorId),
    validarCampos
], heroesDelete );




//router.patch('/', usuariosPatch );




module.exports = router;
