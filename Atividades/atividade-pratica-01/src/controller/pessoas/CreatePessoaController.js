import { prisma } from '../../database/client.js'


export class CreatePessoaController {

    async handle(request, response) {

        try {

            const pessoa = await prisma.pessoas.create({
                data: { ...request.body },
            })

            return response.json(pessoa);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }


    }
}