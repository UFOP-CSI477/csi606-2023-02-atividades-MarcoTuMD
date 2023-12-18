import { prisma } from '../../database/client.js'


export class CreateCidadeController {

    async handle(request, response) {

        try {
            const { nome, estadoId } = request.body;

        if (nome === "") {
            return response.status(400).json({
                message: 'Invalid data. Nome and sigla are required.'
            })
        }

        const cidade = await prisma.cidades.create({
            data: {
                nome,
                estadoId
            }
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