import { prisma } from '../../database/client.js'


export class CreateLocalColetaController {

    async handle(request, response) {

        try {

            const localColeta = await prisma.locaisColeta.create({
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