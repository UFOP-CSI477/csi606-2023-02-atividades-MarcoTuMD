import { prisma } from "../../database/client.js"; 

export class GetAllEstadoController {

    async handle(request, response) {
        try {
            const estados = await prisma.estados.findMany();
            return response.json(estados);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }
       
    }

}