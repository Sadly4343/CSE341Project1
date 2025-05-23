const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Car Api',
        description: 'Car Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointsFiles, doc);