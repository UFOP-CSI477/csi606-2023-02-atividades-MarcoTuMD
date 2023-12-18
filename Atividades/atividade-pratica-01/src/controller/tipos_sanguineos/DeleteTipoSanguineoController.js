import { prisma } from '../../database/client.js'

export class DeleteTipoSanguineoController {

    async handle(request, response) {

        try {
            const { id } = request.params
            const tipoSanquineo = await prisma.tiposSanguineos.delete({
                where: { id: Number(id) },
            })
    
            return response.json(tipoSanquineo);
        } catch (error) {
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }

       
    }
}