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
  modifyUserRole,
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
    res.status(404).send({ error: error.message });
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
      res.status(200).send(userbyName);
    }
  } catch (error) {
     res.status(404).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const byId = await findId(id);
    res.status(200).send(byId);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const userSent = req.body;

  try {
    await findId(id);
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
    const user = await findBymail(email);
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
