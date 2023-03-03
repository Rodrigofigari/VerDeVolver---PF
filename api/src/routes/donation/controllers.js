// Las rutas para devolver al usuario mientras usamos el localhost en el front
// success: 'http://localhost:5173/home',
// failure: 'http://localhost:5173/home',
// Las rutas para devolver al usuario mientras usamos el deploy
// success: 'https://ver-de-volver-pf.vercel.app/',
// failure: 'https://ver-de-volver-pf.vercel.app/',

const { Donation, User, VdV } = require('../../db.js');

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

  const { name, img } = checkVdvs[0].dataValues;

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
      success: 'http://localhost:5173/home',
      failure: 'http://localhost:5173/home',
      pending: '',
    },
    auto_return: 'approved',
    binary_mode: true, 
  };

  const newDonation = await Donation.create({
    amount,
    UserId,
    VdVId,
  });

  return preference;
  
};

const getAll = async () => {
  try {
    const result = Donation.findAll({
      include: [
        { model: User, attributes: ['name', 'last_name', 'image'] },
        { model: VdV, attributes: ['name', 'img'] },
      ],
    });

    return result;
  } catch (error) {
    throw Error('Un error ocurrio. No se pueden traer las donaciones');
  }
};

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
        { model: User, attributes: ['name', 'last_name', 'image'] },
        { model: VdV, attributes: ['name', 'img'] },
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
        { model: User, attributes: ['name', 'last_name', 'image'] },
        { model: VdV, attributes: ['name', 'img'] },
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
