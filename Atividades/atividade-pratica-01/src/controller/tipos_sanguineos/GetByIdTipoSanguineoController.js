import { prisma } from "../../database/client.js";


export class GetByIdTipoSanguineoController {

    async handle(request, response) {

        const { id } = request.params;

        try {
            const tipoSanguineo = await prisma.tiposSanguineos.findUniqueOrThrow({
                where: {
                    id: parseInt(id)
                }
            });
    
            return response.json(tipoSanguineo);
            
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

    }

}