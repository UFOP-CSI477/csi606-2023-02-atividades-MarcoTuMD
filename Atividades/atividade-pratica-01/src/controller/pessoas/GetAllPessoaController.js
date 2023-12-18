
import { prisma } from "../../database/client.js";

export class GetAllPessoaController {

    async handle(request, response) {
        try {
            const pessoa = await prisma.pessoas.findMany();
            return response.json(pessoa);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

    }

}