const { response, request } = require("express");
const Heroe = require("../models/mongoHeroe.model");

const heroesPost = async (req, res = response) => {
  const { id, nombre, bio, img, aparicion, casa } = req.body;

  try {
    // Verificar si ya existe un héroe con ese id o nombre
    const existeHeroe = await Heroe.findOne({ nombre });
    if (existeHeroe) {
      return res.status(400).json({
        msg: "Ya existe un héroe con ese ID o nombre.",
      });
    }

    const heroe = new Heroe({ id, nombre, bio, img, aparicion, casa });

    await heroe.save();

    res.status(201).json({
      ok: true,
      msg: "Héroe creado exitosamente",
      heroe,
    });
  } catch (error) {
    console.error("Error al guardar héroe:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const heroesGet = async (req = request, res = response) => {
  try {
    const heroes = await Heroe.find({});

    res.json({
      ok: true,
      data: heroes,
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const heroesPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  try {
    const heroe = await Heroe.findByIdAndUpdate(id, resto, { new: true });

    res.json({
      ok: true,
      msg: "Héroe actualizado correctamente",
      heroe,
    });
  } catch (error) {
    console.error("Error al actualizar héroe:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const heroesDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const heroe = await Heroe.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Héroe eliminado correctamente",
      heroe,
    });
  } catch (error) {
    console.error("Error al eliminar héroe:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};


const heroesGetPorId = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const heroe = await Heroe.findById(id);

    if (!heroe || !heroe.estado) {
      return res.status(404).json({
        ok: false,
        msg: 'Heroe no encontrado o inactivo',
      });
    }

    res.json({
      ok: true,
      heroe,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener heroe por ID',
      error: error.message,
    });
  }
};

module.exports = {
  heroesGet,
  heroesPost,
  heroesPut,
  heroesDelete,
  heroesGetPorId,
};
