import { prisma } from '../../database/client.js'

export class UpdatePessoaController {

    async handle(request, response) {
        try {
            const { id } = request.params
            const pessoa = await prisma.pessoas.update({
                where: { id: Number(id) },
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