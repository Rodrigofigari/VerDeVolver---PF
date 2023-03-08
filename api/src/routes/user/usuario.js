const { Router } = require('express');
const {
  chargeDbUsers,
  postUser,
  getAllUser,
  getByName,
  findId,
  updateUser,
  deleteUser,
  modifyUserRole,
  findBymail,
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
    const { roleId } = req.query;

    const modifyUser = await modifyUserRole(id, roleId);
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

router.get('/getByEmail/:mail', async (req, res) => {
  const { mail } = req.params;
  try {
    const result = await findBymail(mail);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
