import express, { response } from 'express'
import { prisma } from "./src/database/client.js"
import { estadoRouter } from './src/routes/estados.js';
import { cidadeRouter } from './src/routes/cidades.js';
import { localColetaRouter } from './src/routes/locaisColeta.js';
import { tipoSanguineoRouter } from './src/routes/tiposSanguineos.js';
import { pessoaRouter } from './src/routes/pessoas.js';
import { doacaoRouter } from './src/routes/doacoes.js';

const server = express();
const PORT = 5000

// Routes

server.use(express.json())

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


server.get('/', (request, response) => {
    response.json({
        message: 'Status: Server is running.'
    })
})

server.use(estadoRouter);
server.use(cidadeRouter);
server.use(tipoSanguineoRouter);
server.use(localColetaRouter);
server.use(pessoaRouter);
server.use(doacaoRouter);


server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`)
})