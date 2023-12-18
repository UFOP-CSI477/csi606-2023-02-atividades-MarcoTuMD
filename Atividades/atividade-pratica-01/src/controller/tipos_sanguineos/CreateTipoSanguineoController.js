import { prisma } from '../../database/client.js'

export class CreateTipoSanguineoController {

    async handle(request, response) {

        try {
            const { tipo, fator } = request.body;

            const tiposSanguineo = await prisma.tiposSanguineos.create({
                data: {
                    tipo,
                    fator
                }
            })

            return response.json(tiposSanguineo);
        } catch (error) {
            console.log(error);
            response.status(400).json({
                message: 'Invalid request.',
                error
            })
        }


    }
}