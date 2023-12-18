import { prisma } from "../../database/client.js"; 

export class GetAllTipoSanguineoController {

    async handle(request, response) {
        try {
            const tiposSanguineos = await prisma.tiposSanguineos.findMany();
            return response.json(tiposSanguineos);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }
       
    }

}