import { prisma } from '../../database/client.js'


export class CreateDoacaoController {

    async handle(request, response) {

        try {

            const doacao = await prisma.doacoes.create({
                data: { ...request.body },
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