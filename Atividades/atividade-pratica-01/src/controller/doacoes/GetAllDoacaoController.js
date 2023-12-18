
import { prisma } from "../../database/client.js";

export class GetAllDoacaoController {

    async handle(request, response) {
        try {
            const doacao = await prisma.doacoes.findMany();
            return response.json(doacao);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

    }

}