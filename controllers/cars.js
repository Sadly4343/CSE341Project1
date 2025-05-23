const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tag=['carcollection']
        const result = await mongodb.getDatabase().db().collection('carcollection').find();
        result.toArray().then((carcollection) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(carcollection);
    });
    }
    catch (err) {
        res.status(500).json({error: err.message || "Error has occured retrieving all cars"})
    }

};

const getSingle = async (req, res) => {
    try {
      //#swagger.tag=['carcollection']
    const carId = new ObjectId(req.params.id);
    console.log(req.params.id);
    const result = await mongodb.getDatabase().db().collection('carcollection').find({ _id: carId });
    result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars[0]);

    });  
    }
    catch (err) {
        res.status(500).json({error: err.message || "Error has occured retrieving a car"})
    }
};

const createCar = async (req, res) => {
    try {
        //#swagger.tag=['carcollection']
    const car = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        price: req.body.price,
        mileage: req.body.mileage,
        ownerId: new ObjectId(req.body.ownerId)

    
    }

    const response = await mongodb.getDatabase().db().collection('carcollection').insertOne(car);

    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occured updating user');
    }
    } 
    catch (err) {
        res.status(500).json({error: err.message || "Error has occured creating car"})
    }
}

const updateCar = async (req, res) => {
    try {

    
    //#swagger.tag=['carcollection']
    const carId = new ObjectId(req.params.id);
    const car = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        price: req.body.price,
        mileage: req.body.mileage,
    };

    const response = await mongodb.getDatabase().db().collection('carcollection').replaceOne({ _id: carId}, car);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occured updating car');

    };
} catch (err) {
    res.status(500).json({error: err.message || "Error has occured updating car"})
}
};

const deleteCar = async (req, res) => {
    try {

    
    //#swagger.tag=['carcollection']
    const carId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('carcollection').deleteOne({ _id: carId}, car);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occured while deleting car');
    }
} catch (err) {
    res.status(500).json({error: err.message || "Error has occured deleting car" })
}
}

module.exports = {
    getAll, getSingle, deleteCar, updateCar, createCar
}