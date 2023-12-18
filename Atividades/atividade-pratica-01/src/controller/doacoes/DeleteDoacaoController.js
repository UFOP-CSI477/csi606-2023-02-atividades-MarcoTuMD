import { prisma } from '../../database/client.js'

export class DeleteDoacaoController {

    async handle(request, response) {

        try {
            const { id } = request.params
            const doacao = await prisma.doacoes.delete({
                where: { id: Number(id) },
            })

            return response.json(doacao);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }


    }
}