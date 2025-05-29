const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Car Api',
        description: 'Car Api'
    },
    host: 'cse341project1-53tp.onrender.com/',
    schemes: ['https', 'http']
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointsFiles, doc);