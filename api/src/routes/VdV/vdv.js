const { Router } = require('express');
const { EMAIL } = process.env;
const { sendEmail } = require('../../services/email');
const {
  htmlFormVdVEmailTemplate,
  htmlAdminFormVdVEmailTemplate,
  htmlVdVConfirmationEmailTemplate,
} = require('../../services/email/templates/templateFormVdV');
const {
  chargeDbVdVs,
  vdvCreate,
  getVdV,
  getByIdVdV,
  upDateVdV,
  deleteVdV,
  changeStatus,
  getPending,
  getActive,
} = require('./controllers.js');

const router = Router();
const pepe = [
  {
    name: 'Reciclar Ayuda',
    img: 'www.imagen.com',
    mail: 'ra@mail.com',
    /* password:"12345", */ address: 'calle 1',
    description: 'Somos una ONG sin fines de lucro',
    cbu: '34567898777',

    materials: [1, 2], // este no se pasa a la creacion de la VdV , este dato se usa para relacionar las tablas
  },
  {
    name: 'Juntos X el Cambio',
    img: 'www.imagen.com',
    mail: 'jxec@mail.com',
    /* password:"12345", */ address: 'calle 2',
    description: 'Somos una ONG sin fines de lucro',
    cbu: '23456788777',
    materials: [3, 4],
  },
  {
    name: 'Te Amo Mundo',
    img: 'www.imagen.com',
    mail: 'tam@mail.com',
    /* password:"12345", */ address: 'calle 3',
    description: 'Somos una ONG sin fines de lucro',
    cbu: '0987698777',
    materials: [5, 6],
  },
  {
    name: 'Salvando el Planeta',
    img: 'www.imagen.com',
    mail: 'sep@mail.com',
    /* password:"12345", */ address: 'calle 4',
    description: 'Somos una ONG sin fines de lucro',
    cbu: '8976557898777',
    materials: [3, 4, 1, 2, 5, 6],
  },
];

// ESTE ES EL BULKCREATE PARA CARGAR LA BASE DE DATOS
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeVdvsDb = await chargeDbVdVs(pepe);
    res.status(200).send(chargeVdvsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await vdvCreate(req.body);
    sendEmail(
      req.body.mail,
      'Gracias por completar el formulario 💚',
      htmlFormVdVEmailTemplate(req.body.name)
    );

    sendEmail(
      EMAIL,
      'Tienes una nueva solicitud 🌱',
      htmlAdminFormVdVEmailTemplate(req.body.name)
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    const result = await getVdV(name);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// VdV Dashboard
router.get('/pending', async (req, res) => {
  try {
    const result = await getPending();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Vdv Lista de entidades
router.get('/active', async (req, res) => {
  try {
    const result = await getActive();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// getByIdVdV
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getByIdVdV(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// upDateVdV
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await upDateVdV(id, body);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// deleteVdV
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteVdV(id);
    res.status(200).send(`Solictud ${id} eliminada`);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// cambio de pending a active una vez aprobada la solicitud
router.put('/status/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getByIdVdV(id);
    const resultPass = await changeStatus(id);
    sendEmail(
      result.mail,
      'Tu solicitud fue aceptada.',
      htmlVdVConfirmationEmailTemplate(result.name, resultPass)
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
