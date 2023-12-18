import { prisma } from '../../database/client.js'

export class DeleteLocalColetaController {

    async handle(request, response) {

        try {
            const { id } = request.params
            const localColeta = await prisma.locaisColeta.delete({
                where: { id: Number(id) },
            })

            return response.json(localColeta);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }


    }
}