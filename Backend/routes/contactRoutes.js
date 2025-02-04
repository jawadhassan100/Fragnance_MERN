const express = require('express');
const { createContact, getAllContacts  , deleteContact} = require('../controller/contactController');
const { auth, adminAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-contact', createContact);

router.get('/all-contact',auth , adminAuth, getAllContacts);

router.delete('/delete-contact/:id', auth , adminAuth,  deleteContact);

module.exports = router;