import { prisma } from '../../database/client.js'

export class UpdateEstadoController {
    

    async handle(request, response) {

        try {
            const { id } = request.params
            const estado = await prisma.estados.update({
                where: { id: Number(id) },
                data: { ...request.body },
            })
    
            return response.json(estado);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

       
    }
}