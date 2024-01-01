import swaggerAutogen from 'swagger-autogen';
import path from 'path';
const swaggerAutogenInstance = swaggerAutogen({ openapi: '3.0.0' });

const swaggerDoc = {
  info: {
    version: 'v1.0.0',
    title: 'Books API',
    description: 'Books API document with Swagger and Typescript'
  }
};

const outputFile = './swagger-output.json';
const endPointFiles = ['./api/index.js'];

swaggerAutogenInstance(outputFile, endPointFiles, swaggerDoc);
//swaggerAutogen({ openapi: '3.0.0' })(outputFile, endPointFiles, swaggerDoc);
