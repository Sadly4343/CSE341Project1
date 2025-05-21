const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('hello world')
})

router.use('/cars', require('./cars'));

router.use('/clients', require('./clients'));

module.exports = router;