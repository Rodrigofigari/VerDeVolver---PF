const { Router } = require('express');
//const { VdV } = require('../../db.js');
const {vdvCreate, getVdV, getByIdVdV, upDateVdV, deleteVdV} = require('../VdV/controllerVdV')
const router = Router();


router.post('/', vdvCreate)
router.get('/', getVdV)
router.get('/:id', getByIdVdV)
router.put('/:id', upDateVdV)
router.delete('/:id', deleteVdV)
/* router.post('/', async (req, res) => {
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
}); */

module.exports = router;





/* VdV: ----> LISTO
1. Post, create -> crear una Vdv en la tabla - active *
2. Get. All - if query ( Searchbar listado entidades) *
3. Get By id -> PAra mostrar en el detalle *
4. Put actualizar datos en el perfil de la VDV (Para el sprint - un put para modificar nombre, imagen, direccion - datos basicos) *
5. Eliminar perfil ->  Delete *
 */
