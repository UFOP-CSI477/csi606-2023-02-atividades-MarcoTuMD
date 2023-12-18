import { prisma } from '../../database/client.js'

export class CreateEstadoController {

    async handle(request, response) {

        try {
            const { nome, sigla } = request.body;


            const estado = await prisma.estados.create({
                data: {
                    nome,
                    sigla
                }
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