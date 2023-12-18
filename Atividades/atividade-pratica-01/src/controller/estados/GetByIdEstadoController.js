import { prisma } from "../../database/client.js";


export class GetByIdEstadoController {

    async handle(request, response) {

        const { id } = request.params;

        try {
            const estado = await prisma.estados.findUniqueOrThrow({
                where: {
                    id: parseInt(id)
                }
            });
    
            return response.json(estado);
            
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

    }

}