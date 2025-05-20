const express = require('express');

const router = express.Router();

const carController = require('../controllers/cars');

router.get('/', carController.getAll);

router.get('/:id', carController.getSingle);

router.post('/', carController.createCar);

router.put('/:id', carController.updateCar);

router.delete('/:id', carController.deleteCar);

module.exports = router;