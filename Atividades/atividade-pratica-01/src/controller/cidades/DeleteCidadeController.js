import { prisma } from '../../database/client.js'

export class DeleteCidadeController {

    async handle(request, response) {

        try {
            const { id } = request.params
        const cidade = await prisma.cidades.delete({
            where: { id: Number(id) },
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