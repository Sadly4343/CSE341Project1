const express = require('express');


const { clientValidationRules, validate } = require('../validation/validation');

const router = express.Router();

const clientController = require('../controllers/clients');

router.get('/', clientController.getAll);

router.get('/:id', clientController.getSingle);

router.post('/', clientValidationRules(), validate, clientController.createClient);

router.put('/:id', clientValidationRules(), validate, clientController.updateClient);

router.delete('/:id', clientController.deleteClient);

module.exports = router;