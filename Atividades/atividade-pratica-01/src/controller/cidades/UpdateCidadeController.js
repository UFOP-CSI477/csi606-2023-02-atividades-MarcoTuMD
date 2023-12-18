import { prisma } from '../../database/client.js'

export class UpdateCidadeController {

    async handle(request, response) {
        try {
            const { id } = request.params
            const cidade = await prisma.cidades.update({
                where: { id: Number(id) },
                data: { ...request.body },
            })
    
            return response.json(cidade);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

       
    }
}