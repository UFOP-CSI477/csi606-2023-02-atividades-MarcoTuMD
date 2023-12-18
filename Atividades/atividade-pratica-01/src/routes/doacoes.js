import { Router } from 'express'
import { GetAllDoacaoController } from '../controller/doacoes/GetAllDoacaoController.js'
import { GetByIdDoacaoController } from '../controller/doacoes/GetByIdDoacaoController.js';
import { CreateDoacaoController } from '../controller/doacoes/CreateDoacaoController.js';
import { UpdateDoacaoController } from '../controller/doacoes/UpdateDoacaoController.js';
import { DeleteDoacaoController } from '../controller/doacoes/DeleteDoacaoController.js';



const doacaoRouter = Router()

// Get All
const getAllDoacaoController = new GetAllDoacaoController();
doacaoRouter.get('/doacoes', getAllDoacaoController.handle)

// Get by ID
const getByIdDoacaoController = new GetByIdDoacaoController();
doacaoRouter.get('/doacoes/:id', getByIdDoacaoController.handle);

// Create
const createDoacaoController = new CreateDoacaoController();
doacaoRouter.post('/doacoes', createDoacaoController.handle)

// Update
const updateDoacaoController = new UpdateDoacaoController();
doacaoRouter.put('/doacoes/:id', updateDoacaoController.handle)

// Delete
const deleteDoacaoController = new DeleteDoacaoController();
doacaoRouter.delete('/doacoes/:id', deleteDoacaoController.handle)

// Export - router
export { doacaoRouter } 