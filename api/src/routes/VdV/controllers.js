const { VdV, Material } = require('../../db.js');

async function chargeDbVdVs() {
  const bulkCreateVdvs = await VdV.bulkCreate([
    {
      name: 'Reciclar Ayuda',
      img: 'www.imagen.com',
      mail: 'ra@mail.com',
      password: '12345',
      address: 'calle 1',
      description: 'Somos una ONG sin fines de lucro',
      CBU: '34567898777',
      materials: [1, 5, 7],
    },
    {
      name: 'Juntos X el Cambio',
      img: 'www.imagen.com',
      mail: 'jxec@mail.com',
      password: '12345',
      address: 'calle 2',
      description: 'Somos una ONG sin fines de lucro',
      CBU: '23456788777',
      materials: [2, 3, 5],
    },
    {
      name: 'Te Amo Mundo',
      img: 'www.imagen.com',
      mail: 'tam@mail.com',
      password: '12345',
      address: 'calle 3',
      description: 'Somos una ONG sin fines de lucro',
      CBU: '0987698777',
      materials: [2, 3, 4, 6],
    },
    {
      name: 'Salvando el Planeta',
      img: 'www.imagen.com',
      mail: 'sep@mail.com',
      password: '12345',
      address: 'calle 4',
      description: 'Somos una ONG sin fines de lucro',
      CBU: '8976557898777',
      materials: [1, 2, 3, 5, 6],
    },
  ]);

  return bulkCreateVdvs;
}

const vdvCreate = async (req, res) => {
  const { name, img, description, mail, password, address, CBU, Materials } =
    req.body;
  const { id } = req.body;
  try {
    const vdvCreate = await VdV.create({
      name,
      img,
      mail,
      password,
      address,
      description,
      CBU,
    });

    const materialsDb = await Material.findOne(id);
    await vdvCreate.addMaterials(materialsDb);

    /*  let materialsDb = await Material.findOne(id)
          
  await vdvCreate.addMaterials(materialsDb); 
   */

    res.status(200).send(vdvCreate);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/* const createdVdV = async (req, res) => {
  const {name,img, description, mail, password, address, CBU, materials} = body
  
  const vdvCreate = await VdV.create({
    name,
    img,
    mail,
    password,
    address,
    description,
    CBU,
   
  });
  
  let materialsDb = await Material.findAll()
  await vdvCreate.addMaterials(materialsDb); 
   return vdvCreate 
} */
/* router.get('/', async (req, res) => {
  try {
    const Vdvs = await getVdV()
    res.status(200).send(Vdvs);
  } catch (error) {
    res.status(404).send(error.message);
  }
}); */
/* const allVdvs = await VdV.findAll({
  include: [
   { 
    model: Material,
    attributes: ["id"],

    through: {
      attributes: [],
    }
  }
  ]
    
  });
  return allVdvs */

const getVdV = async (req, res) => {
  try {
    const allVdV = await VdV.findAll({
      include: [
        {
          model: Material,
          attributes: ['id'],

          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).json(allVdV);
    console.log(allVdV);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getByIdVdV = async (req, res) => {
  const { id } = req.params;
  try {
    const VdVFound = await VdV.findByPk(id);
    res.status(200).json(VdVFound);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
//INTENTAR MODULARIZAR COMO LO QUIEREN LOS CHICOS

const upDateVdV = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const VdVupDate = VdV.update(body, {
      where: { id },
    });
    res.status(200).json(VdVupDate);
  } catch (error) {
    res.status(500).send('Problemas');
  }
};

const deleteVdV = (req, res) => {
  const { id } = req.params;
  try {
    const VdVdelete = VdV.destroy({
      where: {
        id,
      },
    });
    res.status(200).json(VdVdelete);
  } catch (error) {
    res.status(500).send('Problemas');
  }
};

module.exports = {
  chargeDbVdVs,
  vdvCreate,
  getVdV,
  getByIdVdV,
  upDateVdV,
  deleteVdV,
};
