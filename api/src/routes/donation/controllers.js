// Las rutas para devolver al usuario mientras usamos el localhost en el front
// success: 'http://localhost:5173/home',
// failure: 'http://localhost:5173/home',
const nodemailer = require('nodemailer');
const { Donation, User, VdV } = require('../../db.js');
const { SMTP_PASSWORD } = process.env;

//ESTE ES EL BULKCREATE NO LO BORREN
async function chargeDbDonation() {
  const bulkCreateDonations = await Donation.bulkCreate([
    { amount: '1500', UserId: '1', VdVId: '1' },
    { amount: '1500', UserId: '1', VdVId: '1' },
    { amount: '2000', UserId: '1', VdVId: '1' },
    { amount: '2500', UserId: '2', VdVId: '1' },
    { amount: '3000', UserId: '3', VdVId: '3' },
    { amount: '5000', UserId: '4', VdVId: '4' },
  ]);

  return bulkCreateDonations;
}

////////FUNCION PARA NOTIFICAR DONACION///////////////
const donationNotification = (obj) => {
  const { user_name, user_lastname, user_mail, amount, vdv_name } = obj;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'verdevolver2@gmail.com',
      pass: SMTP_PASSWORD,
    },
  });

  transporter.sendMail(
    {
      from: 'verdevolver2@gmail.com',
      to: `${user_mail}`,
      subject: 'Gracias por contactarte con nosotros 💚',
      text: '',
      html: `
      
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>VerdeVolver</title>
        <style type="text/css">
        .main_container{
          background-color: #E1FFEB;
          width: 85%;
          heigth:200px;
          text-align: center;
          align-items: center;
          border-radius: 5px;
        }

        img { 
          height: auto; 
          width: 75%; 
          margin: 30px;
          border-radius: 5px;
        }
     
        h1 {
          font-size: 35px; 
          color: black; 
          font-family: Verdana;
        }

        h2 {
          font-size: 25px; 
          color: black; 
          font-family: Verdana;
          margin-bottom: 5px;
        }

        p { 
          color: black; 
          font-family: Verdana;
          font-weight: 500; 
          font-size: 15px; 

        }
        .image_container {
          width: 100%;
        }
        </style>
      </head>
      <body>
        <div class="main_container">
          <div class="image_container">
            <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
          </div>
          <div class="text_container">
            <h1>Hola ${user_name} ${user_lastname}, esperamos desde VerdeVolver que te encuentres muy bien</h1>
            <h2>Este correo es la confirmación de la donación que haz acabado de realizar.</h2>
            <p>Hemos recibido una donación por el valor de: $${amount} ARG.</p>
            <p>Esta donación va dirigida a la entidad: ${vdv_name}</p>
            
            <p>El proceso de transferencia del dinero a la entidad puede tardar de entre 8 a 15 dias</p>
            <p>En el momento en el que sea realizada la transferencia a dicha entidad, te será notificado vía email</p>
            <img alt="fondo-vdv" src="cid:vdv@Fondo" />
          </div>
        </div>
      </body>
      
              `,
      disableUrlAccess: false,
      attachments: [
        {
          filename: 'Header_Mail_pblyyo.png',
          path: 'https://res.cloudinary.com/verdevolver/image/upload/v1677343466/Header_Mail_pblyyo.png',
          cid: 'vdv@Logo',
        },
        {
          filename: 'Fondo2_zstsxi.png',
          path: 'https://res.cloudinary.com/verdevolver/image/upload/v1677345555/Fondo2_zstsxi.png',
          cid: 'vdv@Fondo',
        },
      ],
    },
    (error, info) => {
      if (error) {
        throw Error('An error has ocurred');
      } else {
        console.log('Email sent:sssss ', info.response);
      }
    }
  );
};

/////////////////////////////////////////

const createDonation = async (body) => {
  const { amount, UserId, VdVId } = body;

  const checkUsers = await User.findAll({
    where: { id: UserId },
  });

  const checkVdvs = await VdV.findAll({
    where: { id: VdVId },
  });

  if (!checkUsers || !checkVdvs)
    throw Error(
      'No se puede crear la donacion. El usuario o la VdV no existen'
    );

  // console.log('checkVdvs', checkVdvs);

  const { name, img } = checkVdvs[0].dataValues;
  const userDonate = checkUsers[0].dataValues;

  // id:
  // category_id
  let preference = {
    items: [
      {
        title: name,
        currency_id: 'ARS',
        quantity: 1,
        unit_price: Number(amount),
        description: `Gracias por su donacion a la entidad ${name}`,
        picture_url: img,
      },
    ],
    back_urls: {
      success: 'https://ver-de-volver-pf.vercel.app/',
      failure: 'https://ver-de-volver-pf.vercel.app/',
      pending: '', // Este es para pagos en efectivo, por ejemplo en un rapipago, queda como pendiente
    },
    auto_return: 'approved',
    binary_mode: true, // esto es para que no se acepten pagos pendientes, sino pagos que se resuelvan en el momento -> Pongo mi tarjeta de credito, pago y listo
  };

  const newDonation = await Donation.create({
    amount,
    UserId,
    VdVId,
  });

  const obj = {
    user_name: userDonate.name,
    user_lastname: userDonate.last_name,
    user_mail: userDonate.mail,
    amount: amount,
    vdv_name: name,
  };

  donationNotification(obj);

  return preference;
  // return newDonation;
};

const getAll = async () => {
  try {
    const result = Donation.findAll({
      include: [
        { model: User, attributes: ['name', 'last_name'] },
        { model: VdV, attributes: ['name'] },
      ],
    });

    return result;
  } catch (error) {
    throw Error('Un error ocurrio. No se pueden traer las donaciones');
  }
};

//el nombre de la funcion estaba mal escrito.
const updateDonations = async (id) => {
  await Donation.update(
    {
      status: 'Delivered',
    },
    {
      where: { id: id },
      include: [
        { model: User, attributes: ['name', 'last_name'] },
        { model: VdV, attributes: ['name'] },
      ],
    }
  );
  const result = await Donation.findByPk(id);
  return result;
};

//este no lo tiene rodri
const getDonationsById = async (id) => {
  try {
    if (!id) throw Error('Debes ingresar un id');

    const donation = await Donation.findByPk(id, {
      include: [
        { model: User, attributes: ['name', 'last_name'] },
        { model: VdV, attributes: ['name'] },
      ],
    });

    if (!donation) throw Error('La donacion no existe');

    const result = await Donation.findByPk(id);
    return result;
  } catch (error) {
    throw Error('Ocurrio un error. No se encuentra la donacion');
  }
};

const getByUserId = async (id) => {
  try {
    if (!id) throw Error('Debes ingresar un id');

    const checkuser = await User.findAll({ where: { id: id } });
    if (!checkuser) throw Error('El usuario no existe');

    const result = await Donation.findAll({
      where: {
        UserId: id,
      },
      include: [
        { model: User, attributes: ['name', 'last_name'] },
        { model: VdV, attributes: ['name'] },
      ],
    });
    if (!result) throw Error(`La donacion con id ${id} no fue encontrada`);

    return result;
  } catch (error) {
    throw Error({ error: error.message });
  }
};

const getByVdVId = async (id) => {
  try {
    if (!id) throw Error('Debes ingresar un id');

    const checkVdV = await VdV.findAll({ where: { id: id } });
    if (!checkVdV) throw Error('La VdV no existe');

    const result = await Donation.findAll({
      where: {
        VdVId: id,
      },
      include: [
        { model: User, attributes: ['name', 'last_name'] },
        { model: VdV, attributes: ['name'] },
      ],
    });
    if (!result) throw Error(`La entidad con id ${id} no fue encontrada`);

    return result;
  } catch (error) {
    throw Error({ error: error.message });
  }
};

module.exports = {
  chargeDbDonation,
  updateDonations,
  getByUserId,
  getByVdVId,
  createDonation,
  getAll,
  getDonationsById,
};
