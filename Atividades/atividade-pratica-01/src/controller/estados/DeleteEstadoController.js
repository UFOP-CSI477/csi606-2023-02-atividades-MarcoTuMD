import { prisma } from '../../database/client.js'

export class DeleteEstadoController {

    async handle(request, response) {

        try {
            const { id } = request.params
            const estado = await prisma.estados.delete({
                where: { id: Number(id) },
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