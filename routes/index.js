const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('hello world')
})

router.use('/cars1', require('./cars'));

module.exports = router;