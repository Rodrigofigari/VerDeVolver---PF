const { Router } = require('express');
const router = Router();
const { postInsta } = require('../instagramPosts/controllers');

const {
  Role,
  User,
  VdV,
  Feedback,
  Donation,
  Material,
} = require('../../db.js');
const pepe = [
  {
    name: 'Economía Circular',
    img: 'https://i.pinimg.com/564x/0e/60/c7/0e60c7fcd2d898873fc7d1a5060cc232.jpg',
    mail: 'ra@mail.com',
    /* password:"12345", */ address: 'calle 1',
    description:
      'Entidad privada cuya actividad se centra en mejorar la calidad de vida de las personas optimizando el aprovechamiento de recursos.',
    cbu: '345678987772356789121',
    lat: -34.1,
    lng: -68.2,
    materials: [1, 2], // este no se pasa a la creacion de la VdV , este dato se usa para relacionar las tablas
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Amigos de la Tierra',
    img: 'https://i.pinimg.com/564x/4e/db/10/4edb108418125c6085492f82349de7b2.jpg',
    mail: 'jxec@mail.com',
    /* password:"12345", */ address: 'calle 2',
    description:
      'Somos una asociación ecologista que fomenta el cambio local y global hacia una sociedad respetuosa con el medio ambiente, justa y solidaria.',
    cbu: '545670987772356789132',
    lat: -34.3,
    lng: -68.4,
    materials: [3, 4],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Greenpeace',
    img: 'https://i.pinimg.com/564x/10/81/8c/10818c11b7bf2f08a743ab31bec6273c.jpg',
    mail: 'tam@mail.com',
    /* password:"12345", */ address: 'calle 3',
    description:
      'Organización ecologista y pacifista políticamente independiente.',
    cbu: '445670987772356789135',
    lat: -34.5,
    lng: -68.6,
    materials: [5, 6],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'DemoVerde',
    img: 'https://i.pinimg.com/564x/46/bd/d6/46bdd6d84a58e40513f9883be77a30e1.jpg',
    mail: 'sep@mail.com',
    /* password:"12345", */ address: 'calle 4',
    description:
      'ONG sin fines de lucro para la gestión de los recursos y los residuos',
    cbu: '145670987772356789137',
    lat: -34.7,
    lng: -68.8,
    materials: [3, 4, 1, 2, 5, 6],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Reciclamos muchisimo',
    img: 'https://www.faber-castell.com.ar/-/media/Faber-Castell-new/Corporate/sustainability/2020/image-content-sustainability-trees.ashx?sc_lang=es-AR&la=es-AR&h=1004&w=1074&mw=1280&hash=B6319CBBB0647F5C29A738D155FDDDA5',
    mail: 'recimuchisimo@mail.com',
    /* password:"12345", */ address: 'calle 6',
    description:
      'Empresa gigante que va y busca todo lo que tires.Empresa gigante que va y busca todo lo que tires.Empresa gigante que va y busca todo lo que tires.',
    cbu: '945670987772356789138',
    lat: -34.2,
    lng: -68.1,
    materials: [2, 5, 6, 7],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Verde que te quiero verde',
    img: 'https://cdn-icons-png.flaticon.com/512/4396/4396133.png',
    mail: 'verdeymasverde@mail.com',
    /* password:"12345", */ address: 'calle 6',
    description:
      'Somos una entidad recicladora que recicla cosas reciclables y las reciclamos',
    lat: -34.4,
    lng: -68.3,
    materials: [1],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Agua clara',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWWi7DjPdRzvtAi1cD6HX5N-6Afg33xr_Uw&usqp=CAU',
    mail: 'aguaclara@mail.com',
    address: 'calle 6',
    description:
      'Agarramos basura y la reciclamos.Agarramos basura y la reciclamos.Agarramos basura y la reciclamos.Agarramos basura y la reciclamos.Agarramos basura y la reciclamos.Agarramos basura y la reciclamos.',
    lat: -34.6,
    lng: -68.5,
    materials: [3, 7, 8],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Tierra Verde',
    img: 'https://cdn-icons-png.flaticon.com/512/4396/4396133.png',
    mail: 'tierraverde@mail.com',
    address: 'calle 8',
    description:
      'Recuperamos tierras y las reutilizamos.Recuperamos tierras y las reutilizamos.Recuperamos tierras y las reutilizamos.Recuperamos tierras y las reutilizamos.Recuperamos tierras y las reutilizamos.Recuperamos tierras y las reutilizamos.',
    cbu: '245670987972356789194',
    lat: -34.8,
    lng: -68.7,
    materials: [3, 10, 11],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Aire Puro',
    img: 'https://cdn-icons-png.flaticon.com/512/4396/4396133.png',
    mail: 'airepuro@mail.com',
    address: 'calle 5',
    description:
      'Plantamos árboles para mejorar la calidad del aire.Plantamos árboles para mejorar la calidad del aire.Plantamos árboles para mejorar la calidad del aire.Plantamos árboles para mejorar la calidad del aire.Plantamos árboles para mejorar la calidad del aire.Plantamos árboles para mejorar la calidad del aire.',
    cbu: '745670987912356789175',
    lat: -34.1,
    lng: -68.9,
    materials: [1, 2, 9],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Fuego Nuevo',
    img: 'https://cdn-icons-png.flaticon.com/512/4396/4396133.png',
    mail: 'fuegonuevo@mail.com',
    address: 'calle 7',
    description:
      'Transformamos residuos en energía.Transformamos residuos en energía.Transformamos residuos en energía.Transformamos residuos en energía.Transformamos residuos en energía.Transformamos residuos en energía.',
    lat: -34.2,
    lng: -68.8,
    materials: [1, 9, 11],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Luz Clara',
    img: 'https://cdn-icons-png.flaticon.com/512/4396/4396133.png',
    mail: 'luzclara@mail.com',
    address: 'calle 10',
    description:
      'Usamos energía renovable para iluminar la ciudad.Usamos energía renovable para iluminar la ciudad.Usamos energía renovable para iluminar la ciudad.Usamos energía renovable para iluminar la ciudad.Usamos energía renovable para iluminar la ciudad.Usamos energía renovable para iluminar la ciudad.',
    lat: -34.3,
    lng: -68.7,
    materials: [6, 7, 10],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Mar Limpio',
    img: 'https://cdn-icons-png.flaticon.com/512/4396/4396133.png',
    mail: 'marlimpio@mail.com',
    address: 'calle 3',
    description:
      'Recogemos basura de la playa y la reciclamos.Recogemos basura de la playa y la reciclamos.Recogemos basura de la playa y la reciclamos.Recogemos basura de la playa y la reciclamos.Recogemos basura de la playa y la reciclamos.Recogemos basura de la playa y la reciclamos.',
    cbu: '845671987972356789185',
    lat: -34.6,
    lng: -68.3,
    materials: [3, 7, 8, 11],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Asociacionn de Jovenes Emprendedores',
    img: 'https://i.pinimg.com/564x/46/bd/d6/46bdd6d84a58e40513f9883be77a30e1.jpg',
    mail: 'jb@mail.com',
    address: 'calle 2',
    description:
      'Organización sin fines de lucro que busca impulsar el emprendimiento en jóvenes de bajos recursos.',
    lat: -34.7,
    lng: -68.2,
    materials: [5, 7, 11],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Fundación para la Conservación del Medio Ambiente',
    img: 'https://i.pinimg.com/564x/46/bd/d6/46bdd6d84a58e40513f9883be77a30e1.jpg',
    mail: 'kd@mail.com',
    address: 'calle 3',
    description:
      'Fundación cuyo objetivo es la conservación y restauración de los ecosistemas del planeta.',
    cbu: '145671987872356789104',
    lat: -34.8,
    lng: -68.1,
    materials: [2, 10, 11],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Red de Bibliotecas Públicas',
    img: 'https://i.pinimg.com/564x/46/bd/d6/46bdd6d84a58e40513f9883be77a30e1.jpg',
    mail: 'pa@mail.com',
    address: 'calle 4',
    description:
      'Red de bibliotecas públicas que busca fomentar la lectura y el acceso a la cultura en comunidades marginadas.',
    lat: -34.1,
    lng: -68.1,
    materials: [3, 4, 8, 9],
    status: 'Active',
    RoleId: 4,
  },
  {
    name: 'Fundación para la Educación y el Desarrollo',
    img: 'https://i.pinimg.com/564x/46/bd/d6/46bdd6d84a58e40513f9883be77a30e1.jpg',
    mail: 'ls@mail.com',
    address: 'calle 5',
    description:
      'Organización que busca mejorar la calidad de vida de las personas a través de la educación y el desarrollo personal.',
    cbu: '145601987172356789155',
    lat: -34.2,
    lng: -68.2,
    materials: [3, 4, 10],
    status: 'Pending',
    RoleId: 4,
  },
  {
    name: 'Asociación de Agricultores Familiares',
    img: 'https://i.pinimg.com/564x/46/bd/d6/46bdd6d84a58e40513f9883be77a30e1.jpg',
    mail: 'cw@mail.com',
    address: 'calle 6',
    description:
      'Asociación que busca promover y defender la agricultura familiar y la soberanía alimentaria.',
    lat: -34.3,
    lng: -68.3,
    materials: [3, 4, 7],
    status: 'Pending',
    RoleId: 4,
  },
  {
    name: 'Fundación para la Investigación Científica',
    img: 'https://i.pinimg.com/564x/46/bd/d6/46bdd6d84a58e40513f9883be77a30e1.jpg',
    mail: 'mq@mail.com',
    address: 'calle 7',
    description:
      'Fundación que financia investigaciones científicas en diferentes áreas del conocimiento.',
    cbu: '445601987472356789147',
    lat: -34.4,
    lng: -68.4,
    materials: [3, 4, 8, 9],
    status: 'Pending',
    RoleId: 4,
  },
  {
    name: 'Asociación de Mujeres Empresarias',
    img: 'https://i.pinimg.com/564x/46/bd/d6/46bdd6d84a58e40513f9883be77a30e1.jpg',
    mail: 'hn@mail.com',
    address: 'calle 8',
    description:
      'Asociación que busca fomentar el emprendimiento y el liderazgo de las mujeres en el ámbito empresarial.',
    lat: -34.5,
    lng: -68.5,
    materials: [1, 2, 9, 10],
    status: 'Pending',
    RoleId: 4,
  },
  {
    name: 'Fundación para la Lucha contra el Cáncer',
    img: 'https://i.pinimg.com/564x/10/81/8c/10818c11b7bf2f08a743ab31bec6273c.jpg',
    mail: 'yx@mail.com',
    address: 'calle 9',
    description:
      'Fundación que brinda apoyo a pacientes con cáncer y financia investigaciones para encontrar curas y tratamientos efectivos.',
    lat: -34.6,
    lng: -68.6,
    materials: [4, 7, 8],
    status: 'Pending',
    RoleId: 4,
  },
  {
    name: 'Asociación de Vecinos Unidos',
    img: 'https://i.pinimg.com/564x/10/81/8c/10818c11b7bf2f08a743ab31bec6273c.jpg',
    mail: 'zl@mail.com',
    address: 'calle 10',
    description:
      'Asociación que busca mejorar la calidad de vida de los vecinos y promover la participación ciudadana en la gestión pública.',
    cbu: '645601987162356719152',
    lat: -34.7,
    lng: -68.7,
    materials: [5, 8, 11],
    status: 'Pending',
    RoleId: 4,
  },
];

//1
async function chargeDbRoles() {
  const bulkCreateRoles = await Role.bulkCreate([
    { name: 'User' },
    { name: 'Admin' },
    { name: 'Owner' },
    { name: 'Entity' },
  ]);

  return bulkCreateRoles;
}
//2
async function chargeDbUsers() {
  const role = await Role.findByPk(1);
  const bulkCreateUsers = await User.bulkCreate([
    {
      name: 'Nathan',
      last_name: 'Sebhastian',
      mail: 'seb@mail.com',
      password: '12345',
      address: 'calle 10',
      RoleId: role.id,
      image: 'https://res.cloudinary.com/verdevolver/image/upload/v1677727979/images/rxsjmrsq2wqrzfiw44tt.jpg'
    },
    {
      name: 'Jack',
      last_name: 'Stark',
      mail: 'jack@mail.com',
      password: '12345',
      address: 'calle 20',
      RoleId: role.id,
    },
    {
      name: 'John',
      last_name: 'Snow',
      mail: 'john@mail.com',
      password: '12345',
      address: 'calle 30',
      RoleId: role.id,
    },
    {
      name: 'Marco',
      last_name: 'Polo',
      mail: 'marco@mail.com',
      password: '12345',
      address: 'calle 40',
      RoleId: role.id,
    },
    {
      name: 'Matias',
      last_name: 'Serrano',
      mail: 'mati@mail.com',
      password: '12345',
      address: 'calle 40',
      RoleId: role.id,
      image: 'https://res.cloudinary.com/verdevolver/image/upload/v1677854021/images/letjinjszswjgkb7waul.jpg'
    },
  ]);

  return bulkCreateUsers;
}

//3
const chargeDbMaterial = async () => {
  const bulkCreateMaterial = await Material.bulkCreate([
    { name: 'Plástico' },
    { name: 'Vidrio' },
    { name: 'Metal' },
    { name: 'Tapitas' },
    { name: 'Cartón' },
    { name: 'Aceite' },
    { name: 'Aluminio' },
    { name: 'Madera' },
    { name: 'Textiles' },
    { name: 'Baterias' },
    { name: 'Papel' },
  ]);
  return bulkCreateMaterial;
};

//4
const vdvCreate = async (body) => {
  const {
    name,
    img,
    description,
    mail,
    address,
    cbu,
    materials,
    lat,
    lng,
    status,
    RoleId
  } = body;
  const vdvCreate = await VdV.create({
    name,
    img,
    mail,
    address,
    description,
    cbu,
    lat,
    lng,
    status,
    RoleId, 
  });

  await vdvCreate.addMaterials(materials);
  return vdvCreate;
};

const chargeDbVdVs = (array) => {
  const result = array.map(async (element) => {
    return await vdvCreate(element);
  });
  return Promise.all(result);
};
//5
const chargeDbFeedback = async () => {
  try {
    const bulkCreateFeedbacks = await Feedback.bulkCreate([
      { comment: 'Muy malo, me trataron re mal', rating: '1', UserId: '1', VdVId: '1' },
      { comment: 'Muy bueno. Mejoraron su atencion al cliente', rating: '5', UserId: '1', VdVId: '1' },
      { comment: 'Muy bueno, me encanto', rating: '5', UserId: '1', VdVId: '2' },
      { comment: 'Muy malo', rating: '1', UserId: '2', VdVId: '1' },
      { comment: 'Horrible todo', rating: '1', UserId: '3', VdVId: '3' },
      { comment: 'Super bien toy feliz', rating: '4', UserId: '4', VdVId: '4' },
      { comment: 'Me encanto todo', rating: '5', UserId: '1', VdVId: '3' },
      { comment: 'Amoooo te atienden super bien, no tengo ninguna queja', rating: '5', UserId: '1', VdVId: '5' },
    ]);

    return bulkCreateFeedbacks;
  } catch (error) {
    throw Error('Ocurrio un error. No se pudo cargar la base de datos');
  }
};

//6
async function chargeDbDonation() {
  const bulkCreateDonations = await Donation.bulkCreate([
    { amount: '1500', UserId: '1', VdVId: '1' },
    { amount: '1500', UserId: '1', VdVId: '1' },
    { amount: '2000', UserId: '1', VdVId: '1' },
    { amount: '2500', UserId: '2', VdVId: '1' },
    { amount: '3000', UserId: '3', VdVId: '3' },
    { amount: '5000', UserId: '4', VdVId: '4' },
    { amount: '5000', UserId: '1', VdVId: '5' },
    { amount: '100', UserId: '1', VdVId: '4' },
    { amount: '500', UserId: '1', VdVId: '7' },
  ]);

  return bulkCreateDonations;
}

//7
const posts = [
  {
    url: 'https://www.instagram.com/p/CKTr02XgZMh/?utm_source=ig_web_copy_link',
  },
  {
    url: 'https://www.instagram.com/p/CIT3Hz2jDqh/?utm_source=ig_web_copy_link',
  },
  {
    url: 'https://www.instagram.com/p/CIBswgBs1Ps/?utm_source=ig_web_copy_link',
  },
  {
    url: 'https://www.instagram.com/p/CHpyNNYDUKq/?utm_source=ig_web_copy_link',
  },
];
async function chargeInstagramPosts() {
  posts.forEach(async (post) => {
    await postInsta(post.url);
  });
}

// function autoinvocalbe
router.post('/', async (req, res) => {
  try {
    const first = await chargeDbRoles();
    if (!first) throw Error('Ocurrio un error durante la carga de roles');
    const second = await chargeDbUsers();
    if (!second) throw Error('Ocurrio un error durante la carga de usuarios');
    const third = await chargeDbMaterial();
    if (!third) throw Error('Ocurrio un error durante la carga de materiales');
    const fourth = await chargeDbVdVs(pepe);
    if (!fourth) throw Error('Ocurrio un error durante la carga de entidades');
    const fifth = await chargeDbFeedback();
    if (!fifth) throw Error('Ocurrio un error durante la carga de feedbacks');
    const sixth = await chargeDbDonation();
    if (!sixth) throw Error('Ocurrio un error durante la carga de donaciones');
    await chargeInstagramPosts();

    res.status(200).send('Base de datos cargada.');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
