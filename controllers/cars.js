const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const cars = await mongodb.getDatabase().db().collection('carcollection').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message || "Error occurred retrieving all cars" });
    }
};

const getSingle = async (req, res) => {
    try {
        const carId = new ObjectId(req.params.id);
        const cars = await mongodb.getDatabase().db().collection('carcollection').find({ _id: carId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars[0]);
    } catch (err) {
        res.status(500).json({ error: err.message || "Error occurred retrieving a car" });
    }
};

const createCar = async (req, res) => {
    try {
        const car = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            price: req.body.price,
            mileage: req.body.mileage,
            ownerId: new ObjectId(req.body.ownerId),
        };
        const response = await mongodb.getDatabase().db().collection('carcollection').insertOne(car);
        if (response.acknowledged) {
            res.status(201).json({ insertedId: response.insertedId });
        } else {
            res.status(500).json(response.error || 'Error occurred creating car');
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Error occurred creating car" });
    }
};

const updateCar = async (req, res) => {
    try {
        const carId = new ObjectId(req.params.id);
        const car = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            price: req.body.price,
            mileage: req.body.mileage,
        };
        const response = await mongodb.getDatabase().db().collection('carcollection').replaceOne({ _id: carId }, car);
        if (response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Error occurred updating car" });
    }
};

const deleteCar = async (req, res) => {
    try {
        const carId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('carcollection').deleteOne({ _id: carId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Error occurred deleting car" });
    }
};

module.exports = {
    getAll, getSingle, deleteCar, updateCar, createCar
}