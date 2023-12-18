import { Router } from 'express'
import { GetAllLocalColetaController } from '../controller/locais_coleta/GetAllLocalColetaController.js'
import { GetByIdLocalColetaController } from '../controller/locais_coleta/GetByIdLocalColetaController.js';
import { CreateLocalColetaController } from '../controller/locais_coleta/CreateLocalColetaController.js';
import { UpdateLocalColetaController } from '../controller/locais_coleta/UpdateLocalColetaController.js';
import { DeleteLocalColetaController } from '../controller/locais_coleta/DeleteLocalColetaController.js';



const localColetaRouter = Router()

// Get All
const getAllLocalColetaController = new GetAllLocalColetaController();
localColetaRouter.get('/locaisColeta', getAllLocalColetaController.handle)

// Get by ID
const getByIdLocalColetaController = new GetByIdLocalColetaController();
localColetaRouter.get('/locaisColeta/:id', getByIdLocalColetaController.handle);

// Create
const createLocalColetaController = new CreateLocalColetaController();
localColetaRouter.post('/locaisColeta', createLocalColetaController.handle)

// Update
const updateLocalColetaController = new UpdateLocalColetaController();
localColetaRouter.put('/locaisColeta/:id', updateLocalColetaController.handle)

// Delete
const deleteLocalColetaController = new DeleteLocalColetaController();
localColetaRouter.delete('/locaisColeta/:id', deleteLocalColetaController.handle)

// Export - router
export { localColetaRouter } 