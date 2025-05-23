const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try{
    //#swagger.tag=['clients']
    const result = await mongodb.getDatabase().db().collection('clients').find();
    result.toArray().then((clients) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(clients);
    });}
    catch (err) {
    res.status(500).json({error: err.message || "Error has occured deleting car" })
}
};

const getSingle = async (req, res) => {
    try{
    //#swagger.tag=['clients']
    const clientId = new ObjectId(req.params.id);
    console.log(req.params.id);
    const result = await mongodb.getDatabase().db().collection('clients').find({ _id: clientId });
    result.toArray().then((clients) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(clients[0]);

    });}

    catch (err) {
    res.status(500).json({error: err.message || "Error has occured deleting car" })
}
};

const createClient = async (req, res) => {
    try {

    
    //#swagger.tag=['clients']
    const client = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    }

    const result = await mongodb.getDatabase().db().collection('clients').insertOne(client);

    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occured updating user');
    }}
    catch (err) {
    res.status(500).json({error: err.message || "Error has occured deleting car" })
}
}

const updateClient = async (req, res) => {
    try {
    //#swagger.tag=['clients']
    const clientId = new ObjectId(req.params.id);
    const client = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    };

    const response = await mongodb.getDatabase().db().collection('clients').replaceOne({ _id: clientId}, client);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occured updating car');

    };}
    catch (err) {
    res.status(500).json({error: err.message || "Error has occured deleting car" })
}
};

const deleteClient = async (req, res) => {
    try {

    
    //#swagger.tag=['clients']
    const clientId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('clients').deleteOne({ _id: clientId});
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occured while deleting car');
    }}
    catch (err) {
    res.status(500).json({error: err.message || "Error has occured deleting car" })
}
}

module.exports = {
    getAll, getSingle, deleteClient, updateClient, createClient
}