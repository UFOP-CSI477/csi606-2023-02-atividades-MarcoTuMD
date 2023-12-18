import { prisma } from "../../database/client.js";


export class GetByIdCidadeController {

    async handle(request, response) {

        try {

            const { id } = request.params;
            const cidade = await prisma.cidades.findUniqueOrThrow({
                where: {
                    id: parseInt(id)
                }
            });
    
            return response.json(cidade);
            
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

    }

}