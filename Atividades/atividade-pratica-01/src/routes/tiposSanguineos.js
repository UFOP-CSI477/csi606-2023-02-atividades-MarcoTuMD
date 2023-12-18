import { Router } from 'express'
import { GetAllTipoSanguineoController } from '../controller/tipos_sanguineos/GetAllTipoSanguineoController.js'
import { GetByIdTipoSanguineoController } from '../controller/tipos_sanguineos/GetByIdTipoSanguineoController.js';
import { CreateTipoSanguineoController } from '../controller/tipos_sanguineos/CreateTipoSanguineoController.js';
import { UpdateTipoSanguineoController } from '../controller/tipos_sanguineos/UpdateTipoSanguineoController.js';
import { DeleteTipoSanguineoController } from '../controller/tipos_sanguineos/DeleteTipoSanguineoController.js';



const tipoSanguineoRouter = Router()

// Get All
const getAllTipoSanguineoController = new GetAllTipoSanguineoController();
tipoSanguineoRouter.get('/tiposSanguineos', getAllTipoSanguineoController.handle)

// Get by ID
const getByIdTipoSanguineoController = new GetByIdTipoSanguineoController();
tipoSanguineoRouter.get('/tiposSanguineos/:id', getByIdTipoSanguineoController.handle);

// Create
const createTipoSanguineoController = new CreateTipoSanguineoController();
tipoSanguineoRouter.post('/tiposSanguineos', createTipoSanguineoController.handle)

// Update
const updateTipoSanguineoController = new UpdateTipoSanguineoController();
tipoSanguineoRouter.put('/tiposSanguineos/:id', updateTipoSanguineoController.handle)

// Delete
const deleteTipoSanguineoController = new DeleteTipoSanguineoController();
tipoSanguineoRouter.delete('/tiposSanguineos/:id', deleteTipoSanguineoController.handle)

// Export - router
export { tipoSanguineoRouter } 