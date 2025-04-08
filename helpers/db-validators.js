const { Usuario} = require("../models");
const { Heroe} = require("../models");


const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
      throw new Error(`El id no existe ${id}`);
    }
  };

  
const existeHeroePorId = async (id) => {
  const existeHeroePorId = await Heroe.findById(id);
  if (!existeHeroePorId) {
    throw new Error(`El id no existe ${id}`);
  }
};
  module.exports = {
     existeUsuarioPorId,
     existeHeroePorId,
   };
  