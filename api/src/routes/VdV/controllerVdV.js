const { VdV} = require('../../db.js');


const vdvCreate = async (req, res) => {
    const data = req.body;
    try {
      const newVdV = await VdV.create({
        name: data.name,
        img: data.img,
        mail: data.mail,
        password: data.password,
        address: data.address,
        description: data.description,
        CBU: data.CBU,
      });
      res.status(200).send(newVdV);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  const getVdV = async (req, res) => {
    try {
        const allVdV = await VdV.findAll()

        res.status(200).json(allVdV)
    } catch (error) {
        res.status(400).send(error.message)
    }
  }

  const getByIdVdV = async (req, res) => {
    const {id} = req.params
    try {
        const VdVFound = await VdV.findByPk(id);
        res.status(200).json(VdVFound)
        
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  const upDateVdV = (req, res ) => {
    const {id} = req.params
    const body = req.body
    try {
      const VdVupDate = VdV.update(body, {
        where: {id}

      })
      res.status(200).json(VdVupDate)
      
    } catch (error) {
      res.status(500).send('Problemas')
      
    }
  }

  const deleteVdV = (req, res) => {
    const {id} = req.params
    try {
      const VdVdelete = VdV.destroy({
        where: {
          id
        }
      })
      res.status(200).json(VdVdelete)
    } catch (error) {
      res.status(500).send('Problemas')
    }
  }
  

  module.exports = {
    vdvCreate,
    getVdV,
    getByIdVdV,
    upDateVdV,
    deleteVdV
  }


  /*
   PARA EL POSTMAN
   "name" : "verdeVolver",
  "img":"https://santiagorecicla.mma.gob.cl/wp-content/uploads/2015/12/recycling.png",
  "description": "Nos dedicamos a ayudarte a encontrar tu punto verde mas cercano",
  "address": "calle 23",
  "CBU":"1235489465135496687413285465694762",
  "mail": "verdeVolver@gmail.com",
  "password": "verdeVolver" */