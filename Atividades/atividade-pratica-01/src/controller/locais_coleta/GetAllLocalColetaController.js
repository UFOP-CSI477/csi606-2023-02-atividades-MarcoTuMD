import { prisma } from "../../database/client.js"; 

export class GetAllLocalColetaController {

    async handle(request, response) {
        try {
            const localColeta = await prisma.locaisColeta.findMany();
        return response.json(localColeta);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }
        
    }

}