const swaggerAutogen = require('swagger-autogen')();

const doc = {
  
  info: {
    title: 'PIII',
    description: 'Aplicacion inicial de backend',
  },
   host: 'localhost:3000'
};

const outputFile = '../../swagger-output.json';
const routes = [
  "src/modules/user/user.routes.js",
  "src/modules/task/task.routes.js",
  "src/modules/client/cliente.routes.js"
];

swaggerAutogen(outputFile, routes, doc);

