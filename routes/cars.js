const express = require('express');

const { carValidationRules, validate } = require('../validation/validation');

const router = express.Router();

const carController = require('../controllers/cars');

router.get('/', carController.getAll);

router.get('/:id', carController.getSingle);

router.post('/', carValidationRules(), validate, carController.createCar);

router.put('/:id', carValidationRules(), validate, carController.updateCar);

router.delete('/:id', carController.deleteCar);

module.exports = router;