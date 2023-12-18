import { prisma } from '../../database/client.js'

export class UpdateLocalColetaController {

    async handle(request, response) {
        try {
            const { id } = request.params
            const localColeta = await prisma.locaisColeta.update({
                where: { id: Number(id) },
                data: { ...request.body },
            })
    
            return response.json(localColeta);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

       
    }
}