const { Router } = require('express');
const { sendEmail } = require('../../services/email');
const { sign } = require('jsonwebtoken');
const {
  htmlChangePasswordEmailTemplate,
} = require('../../services/email/templates/templateUsers');
const {
  chargeDbUsers,
  postUser,
  getAllUser,
  getByName,
  findId,
  updateUser,
  deleteUser,
  findBymail,
  changePasswordByToken,
} = require('./controllers.js');
const router = Router();

router.post('/chargeDb', async (req, res) => {
  try {
    const chargeUsersDb = await chargeDbUsers();
    res.status(200).send(chargeUsersDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

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

router.put('/toowner/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const modifyUser = await modifyUserRole(id);

    res.status(200).send(modifyUser);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

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

router.get('/password/:email', async (req, res) => {
  const { email } = req.params;
  try {
    console.log('email', email);
    const user = await findBymail(email);
    console.log('user', user.name);
    sendEmail(
      email,
      'Cambio de contraseña',
      htmlChangePasswordEmailTemplate(
        user.name,
        sign({ email }, process.env.SECRET, { expiresIn: '24h' })
      )
    );
    res.status(200).send('Enviado con éxito');
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post('/password', async (req, res) => {
  const { token, password } = req.body;
  try {
    res.status(200).send(await changePasswordByToken(token, password));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
