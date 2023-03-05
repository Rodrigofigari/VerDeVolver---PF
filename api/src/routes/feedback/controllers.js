const { Feedback, User, VdV } = require('../../db.js');
const { Op } = require('sequelize');

const chargeDbFeedback = async () => {
  try {
    const bulkCreateFeedbacks = await Feedback.bulkCreate([
      {
        comment: 'Muy malo, me trataron re mal',
        rating: '1',
        UserId: '1',
        VdVId: '1',
      },
      {
        comment: 'Muy bueno. Mejoraron su atencion al cliente',
        rating: '5',
        UserId: '1',
        VdVId: '1',
      },
      {
        comment: 'Muy bueno, me encanto',
        rating: '5',
        UserId: '2',
        VdVId: '2',
      },
      { comment: 'Muy malo', rating: '1', UserId: '2', VdVId: '2' },
      { comment: 'Horrible todo', rating: '1', UserId: '3', VdVId: '3' },
      { comment: 'Super bien toy feliz', rating: '4', UserId: '4', VdVId: '4' },
    ]);

    return bulkCreateFeedbacks;
  } catch (error) {
    throw Error('Ocurrio un error. No se pudo cargar la base de datos');
  }
};

const createFeedback = async (body) => {
  if(!body) throw Error('No se recibieron datos para procesar la petición'); 

    const { comment, rating, UserId, VdVId } = body;

    const checkUsers = await User.findAll({
      where: { id: UserId },
    });
    const checkVdvs = await VdV.findAll({
      where: { id: VdVId },
    });

    if (!checkUsers || !checkVdvs)
      throw Error('No se pudo crear el feedback. Usuario o Entidad no existen');

    const newFeedback = await Feedback.create({
      comment,
      rating,
      UserId,
      VdVId,
    });

    return newFeedback;
};

const getFeedbacks = async () => {
    const feedbacksWUsersVdvData = await Feedback.findAll({
      include: [
        { model: User, attributes: ['name', 'last_name', 'image'] },
        { model: VdV, attributes: ['name', 'img'] },
      ],
    });

    return feedbacksWUsersVdvData;
};

const getFeedbacksById = async (id) => {

    if (!id) throw Error('Debes ingresar un id');

    const feedback = Feedback.findByPk(id, {
      include: [
        { model: User, attributes: ['name', 'last_name', 'image'] },
        { model: VdV, attributes: ['name', 'img'] },
      ],
    });

    if (!feedback) throw Error('El feedback no existe');

    return feedback;
};

const getFeedbacksByUserId = async (id) => {
    if (!id) throw Error('Debes ingresar un id');

    const checkuser = await User.findAll({ where: { id: id } });
    if (!checkuser) throw Error('El usuario no existe');

    const feedbackWUsersVdvData = await Feedback.findAll({
      where: {
        UserId: {
          [Op.eq]: id,
        },
      },
      include: [
        { model: User, attributes: ['name', 'last_name', 'image'] },
        { model: VdV, attributes: ['name', 'img'] },
      ],
    });
    if (!feedbackWUsersVdvData)
      throw Error(
        `Ocurrio un error. No se encontraron feedbacks del usuario de id ${id}`
      );

    return feedbackWUsersVdvData;
};

const getFeedbacksByVdVId = async (id) => {
    if (!id) throw Error('Debes ingresar un id');

    const checkVdV = await VdV.findAll({ where: { id: id } });
    if (!checkVdV) throw Error('La entidad no existe');

    const feedbackWUsersVdvData = await Feedback.findAll({
      where: {
        VdVId: {
          [Op.eq]: id,
        },
      },
      include: [
        { model: User, attributes: ['name', 'last_name', 'image'] },
        { model: VdV, attributes: ['name', 'img'] },
      ],
    });
    if (!feedbackWUsersVdvData)
      throw Error(
        `Ocurrio un error. No se encontraron feedbacks para la entidad de id ${id}`
      );

    return feedbackWUsersVdvData;
};

const updateFeedback = async (id, comment, rating) => {

  if (!comment || !rating || !id) throw Error('Debes ingresar los datos obligatorios para procesar la petición');

  const feedbackToUpdate = await Feedback.findAll({ where: { id: id } });
  if (!feedbackToUpdate) throw Error('No existe un feedback con ese id');

  await Feedback.update(
    {
      comment: comment,
      rating: rating,
    },
    { where: { id: id } }
  );

  const updatedFeedback = await getFeedbacksById(id);

  return updatedFeedback;
};

const deleteFeedback = async (id) => {
    if (!id) throw Error('Debes ingresar un id');

    const feedbackToDelete = await Feedback.findAll({ where: { id: id } });
    if (!feedbackToDelete) throw Error('El feedback no existe');

    const deleting = await Feedback.destroy({ where: { id: id } });

    return deleting;
};

const getAllVdV = async () => {
  const checkVdvs = await VdV.findAll();
  return checkVdvs.map((ele) => ele.dataValues.id); 
};

const mapeoDeIds = (array) => {
  if(!array) throw Error('No se recibió array para mapear'); 
  const result = array.map(async (ele) => {
    return await getFeedbacksByVdVId(ele); 
  });
  return Promise.all(result);
};

const getFeedbacksForVdV = async () => {
  const result = mapeoDeIds(await getAllVdV());
  return result;
};
const getRatings = async () => {
  const entitiesAndReviews = await getFeedbacksForVdV();
  const entitiesWithReviews = entitiesAndReviews.filter(
    (ent) => ent.length > 0
  ); 
  entitiesWithReviews.forEach(async (ele) => {
    let contador = 0;
    let rating = 0;
   
    ele.forEach((element) => {
      rating += element.rating;
      contador++;
    });
    await VdV.update(
      { rating: Math.floor(rating / contador) },
      {
        where: { name: ele[0].VdV.name },
      }
    );
  });

  const vdvUpdateRating = await VdV.findAll();
  return vdvUpdateRating.filter((vdv) => vdv.dataValues.rating !== null);
};

const ratingSort = async (order) => {
  const result = await getRatings();
  order === 'Ascendente'
    ? result.sort((a, b) => a.dataValues.rating - b.dataValues.rating)
    : result.sort((a, b) => b.dataValues.rating - a.dataValues.rating);
  return result;
};

module.exports = {
  chargeDbFeedback,
  createFeedback,
  getFeedbacks,
  getFeedbacksById,
  getFeedbacksByUserId,
  getFeedbacksByVdVId,
  updateFeedback,
  deleteFeedback,
  getRatings,
  ratingSort,
  getFeedbacksForVdV,
};
