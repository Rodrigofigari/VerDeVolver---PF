const { Router } = require('express');
const { mercadopago } = require('../mercadoPago.js');
const { SMTP_PASSWORD } = process.env;

const {
  chargeDbDonation,
  getByUserId,
  getByVdVId,
  updateDonations,
  createDonation,
  getAll,
  getDonationsById,
} = require('./controllers.js');

const router = Router();

// ESTE ES EL BULKCREATE NO LO BORREN
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeDonationsDb = await chargeDbDonation();
    res.status(200).send(chargeDonationsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// creacion de donacion
router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const newDonation = await createDonation(body); // recibe preference

    mercadopago.preferences
      .create(newDonation)
      .then((response) => res.status(200).send(response));
    // res.status(200).send(newDonation);
  } catch (error) {
    res.status(404).send(error.message);
    // 'Ocurrio un error. No se puede crear la donacion'
  }
});

// obtener todos
router.get('/', async (req, res) => {
  try {
    const allDonations = await getAll();

    return res.status(200).send(allDonations);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// update- modificacion de Pending a Delivered (status)
// la modifique porque se rompia despues de hacer una donacion. Se ejecutaba igual el if del status 404,
// entonces lo saque
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updateDon = await updateDonations(id);
    if (updateDon)
      res.status(200).send(`Donacion ID ${id}, status actualizado `);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// obtener las donaciones del usuarioId
router.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const findByUser = await getByUserId(id);
    return res.status(200).json(findByUser);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// obtener las donaciones a la VdVId
router.get('/vdv/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const findByVdV = await getByVdVId(id);
    return res.status(200).json(findByVdV);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

//este no lo tiene rodri
//obtener donaciones por el id especifico de la donacion
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const donation = await getDonationsById(id);
    res.status(200).send(donation);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
