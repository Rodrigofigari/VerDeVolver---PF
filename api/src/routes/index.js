const { Router } = require('express');

const router = Router();

const userMiddle = require('./user/usuario.js');
const vdvMiddle = require('./VdV/vdv.js');
const donationMiddle = require('./donation/donations.js');
const feedbackMiddle = require('./feedback/feedback.js');
const serviceMiddle = require('./service/service.js');
const materialMiddle = require('./material/material.js');
const roleMiddle = require('./role/role.js');
const chargeDbMiddle = require('./chargeDb/chargeDb.js');
const contactMiddle = require('./contact/contact.js');

router.use('/user', userMiddle);
router.use('/vdv', vdvMiddle);
router.use('/donation', donationMiddle);
router.use('/feedback', feedbackMiddle);
router.use('/service', serviceMiddle);
router.use('/material', materialMiddle);
router.use('/role', roleMiddle);
router.use('/chargedb', chargeDbMiddle);
router.use('/contact', contactMiddle);

module.exports = router;
