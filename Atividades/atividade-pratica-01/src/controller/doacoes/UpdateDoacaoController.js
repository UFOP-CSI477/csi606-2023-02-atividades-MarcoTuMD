import { prisma } from '../../database/client.js'

export class UpdateDoacaoController {

    async handle(request, response) {
        try {
            const { id } = request.params
            const doacao = await prisma.doacoes.update({
                where: { id: Number(id) },
                data: { ...request.body },
            })
    
            return response.json(doacao);
        } catch (error) {
            console.log(error);
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

       
    }
}