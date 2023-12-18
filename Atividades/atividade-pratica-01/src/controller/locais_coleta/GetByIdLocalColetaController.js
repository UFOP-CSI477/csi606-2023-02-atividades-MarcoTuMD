import { prisma } from "../../database/client.js";


export class GetByIdLocalColetaController {

    async handle(request, response) {

        try {

            const { id } = request.params;
            const localColeta = await prisma.locaisColeta.findUniqueOrThrow({
                where: {
                    id: parseInt(id)
                }
            });
    
            return response.json(localColeta);
            
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

    }

}