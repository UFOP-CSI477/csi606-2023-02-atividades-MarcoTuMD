import { prisma } from "../../database/client.js";


export class GetByIdDoacaoController {

    async handle(request, response) {

        try {

            const { id } = request.params;
            const doacao = await prisma.doacoes.findUniqueOrThrow({
                where: {
                    id: parseInt(id)
                }
            });
    
            return response.json(doacao);
            
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

    }

}