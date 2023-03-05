const { InstagramPosts } = require('../../db.js');

const postInsta = async (url) => {
  if(!url) throw Error('Debes ingresar una url'); 
  try {
    await InstagramPosts.create({ url });
  } catch (error) {
    throw Error(error.message);
  }
};

const updateInsta = async ({ url, id }) => {
  if(!id) throw Error('Debes ingresar un id');
  if(!url) throw Error('Debes ingresar una url'); 

  try {
    const post = await InstagramPosts.findByPk(id);
    post.url = url;
    await post.save();
  } catch (error) {
    throw Error(error.message);
  }
};

const getAllPosts = async () => {
  try {
    const posts = InstagramPosts.findAll();
    return posts;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  postInsta,
  updateInsta,
  getAllPosts,
};
