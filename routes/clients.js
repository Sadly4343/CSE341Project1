const express = require('express');


const { clientValidationRules, validate } = require('../validation/validation');

const { isAuthenticated } = require('../validation/authenticate')

const router = express.Router();

const clientController = require('../controllers/clients');

router.get('/', clientController.getAll);

router.get('/:id', clientController.getSingle);

router.post('/', isAuthenticated, clientValidationRules(), validate, clientController.createClient);

router.put('/:id', isAuthenticated, clientValidationRules(), validate, clientController.updateClient);

router.delete('/:id', isAuthenticated, clientController.deleteClient);

module.exports = router;