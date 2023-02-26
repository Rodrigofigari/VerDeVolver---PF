const { Router } = require('express');
const {
  chargeDbUsers,
  postUser,
  getAllUser,
  getByName,
  findId,
  updateUser,
  deleteUser,
} = require('./controllers.js');

const router = Router();

//NO BORREN. ESTE ES EL BULKCREATE PARA CARGAR LA BASE DE DATOS
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeUsersDb = await chargeDbUsers();
    res.status(200).send(chargeUsersDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// crear usuarios
router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const result = await postUser(body);
    res.status(200).send(result);
  } catch (error) {
    res
      .status(404)
      .send(`El usuario con mail ${body.mail}, ya habia sido creado`);
  }
});

// get todos los usuarios || query por nombre
router.get('/', async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      const allUsers = await getAllUser();
      res.status(200).send(allUsers);
    } else {
      const userbyName = await getByName(name);

      !userbyName.length
        ? res.status(400).send(`No se encontro usuario con nombre ${name}`)
        : res.status(200).send(userbyName);
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// usuario por id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {

    const byId = await findId(id);
    !byId
      ? res.status(400).send(`El usuario con id ${id} no fue encontrado`)
      : res.status(200).send(byId);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// modificar datos de un User
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const userSent = req.body;


  try {
    const upgradedId = await findId(id);
    if (!upgradedId)
      res.status(404).send(`El usuario con id ${id} no fue encontrado`);

    await updateUser(userSent, id);
    const result = await findId(id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// Eliminar User -> No usamos Borrado Logico
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    return res
      .status(200)
      .send(`El usuario con id ${id}, fue eliminado satisfactoriamente`);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
