import { prisma } from '../../database/client.js'

export class UpdateTipoSanguineoController {

    async handle(request, response) {

        try {
            const { id } = request.params
            const tipoSanguineo = await prisma.tiposSanguineos.update({
                where: { id: Number(id) },
                data: { ...request.body },
            })

            return response.json(tipoSanguineo);

        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }


    }
}