const { Router } = require('express');
const { EMAIL } = process.env;
const { sendEmail } = require('../../services/email');
const {
  htmlFormVdVEmailTemplate,
  htmlAdminFormVdVEmailTemplate,
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
  deletePerfil,
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

//----------PENDIENTES---------------
//** HACER RUTAS PARA TRAERNOS LAS VDV QUE ESTEN ACTIVAS O PENDIENTES -> admin "Pending" y listado entidades "Active".✔️
//** QUERY SEARCHBAR -> BUSQUEDA POR LO INGRESADO EN EL SEARCHBAR (NOMBRE/STRING DE LA VDV -> QIE TRAIGA TODAS LAS VDV CORRESPONDIENTES AL VALOR INGRESADO) ✔️

//** VER DE DEVOLVERLES UN ARRAY CON LOS NOMBRES DE LOS MATERIALES -> ["Madera", "Vidrio", etc] 🥴
//** VER COMO PODEMOS IMPLEMENTAR EL FILTRADO COMBINADO EN EL BACK, LOS CHICOS DEL FRONT NO TIENEN DRAMA EN ENCARGARSE ELLOS -> FILTROS(MATERIALES) + ORDENAMIENTO(RATING/PUNTUACION)

//FUNCIONA. ESTE ES EL BULKCREATE PARA CARGAR LA BASE DE DATOS
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeVdvsDb = await chargeDbVdVs(pepe);
    res.status(200).send(chargeVdvsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//FUNCIONA
router.post('/', async (req, res) => {
  try {
    const result = await vdvCreate(req.body);
    res.status(200).send(result);
    sendEmail(
      req.body.mail,
      'Gracias por completar el formulario 💚',
      htmlFormVdVEmailTemplate(req.body.name)
    );
    // TODO DASHBOARD
    sendEmail(
      EMAIL,
      'Tienes una nueva solicitud 🌱',
      htmlAdminFormVdVEmailTemplate(req.body.name)
    );
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//FUNCIONA
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

//FUNCIONA. getByIdVdV
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getByIdVdV(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//FUNCIONA. upDateVdV
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

//FUNCIONA. deleteVdV
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
// TODAS LOS REGISTROS DE CREACION DE VDV ARRANCAN EN PENDING - TENERLO EN CUENTA PARA EL PRIMER SPRINT
router.put('/status/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await changeStatus(id, body);
    res.status(200).send(result);
    /* res.status(200).send('Solicitud aprobada. Se te ha creado una contrasena provisoria'); */
  } catch (error) {
    res.status(404).send(error - message);
  }
});

router.put('/deletePerfil/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deletePerfil(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Agregar ruta CBU -> modificacion de CBU

module.exports = router;
