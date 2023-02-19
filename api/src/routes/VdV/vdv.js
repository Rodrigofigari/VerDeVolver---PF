const { Router } = require('express');
const { chargeDbVdVs, vdvCreate, getVdV,getByIdVdV, upDateVdV, deleteVdV} = require('./controllers.js');


const router = Router();


//NO BORREN. ESTE ES EL BULKCREATE PARA CARGAR LA BASE DE DATOS
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeVdvsDb = await chargeDbVdVs();
    res.status(200).send(chargeVdvsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
}); 



router.post('/', vdvCreate)

router.get('/:id',getByIdVdV)

router.get('/',getVdV)
 
router.put('/:id',upDateVdV)

router.delete('/:id', deleteVdV)

module.exports = router;
