const express = require('express');

const { carValidationRules, validate } = require('../validation/validation');

const router = express.Router();

const carController = require('../controllers/cars');

const { isAuthenticated } = require('../validation/authenticate')


router.get('/', carController.getAll);

router.get('/:id', carController.getSingle);

router.post('/',  isAuthenticated, carValidationRules(), validate, carController.createCar);

router.put('/:id', isAuthenticated, carValidationRules(), validate, carController.updateCar);

router.delete('/:id', isAuthenticated, carController.deleteCar);

module.exports = router;