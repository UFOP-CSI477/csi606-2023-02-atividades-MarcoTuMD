import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'



const app = express();
var cors = require('cors')
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json('Olá Mundo! Essa é a minha primeira rota :)');
});

//corrida
app.get('/corrida', async (req: Request, res: Response) => {
    try {
        const corridas = await prisma.corrida.findMany();
        return res.json(corridas);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.get('/corrida/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const corrida = await prisma.corrida.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return res.json(corrida);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.post('/corrida', async (req: Request, res: Response) => {
    try {
        const corrida = await prisma.corrida.create({
            data: { ...req.body },
        })

        return res.json(corrida);
    } catch (error) {
        console.log(error);
        
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.put('/corrida/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const corrida = await prisma.corrida.update({
            where: { id: Number(id) },
            data: { ...req.body },
        })

        return res.json(corrida);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.delete('/corrida/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const corrida = await prisma.corrida.delete({
            where: { id: Number(id) },
        })
        return res.json(corrida);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});
//equipameto

app.get('/equipamento', async (req: Request, res: Response) => {
    try {
        const equipamentos = await prisma.equipamento.findMany();
        return res.json(equipamentos);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.get('/equipamento/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const equipamento = await prisma.equipamento.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return res.json(equipamento);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.post('/equipamento', async (req: Request, res: Response) => {
    try {
        const equipamento = await prisma.equipamento.create({
            data: { ...req.body },
        })

        return res.json(equipamento);
    } catch (error) {        
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.put('/equipamento/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const equipamento = await prisma.equipamento.update({
            where: { id: Number(id) },
            data: { ...req.body },
        })

        return res.json(equipamento);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.delete('/equipamento/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const equipamento = await prisma.equipamento.delete({
            where: { id: Number(id) },
        })
        return res.json(equipamento);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});


//local

app.get('/local', async (req: Request, res: Response) => {
    try {
        const locais = await prisma.local.findMany();
        return res.json(locais);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.get('/local/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const local = await prisma.local.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return res.json(local);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.post('/local', async (req: Request, res: Response) => {
    try {
        const local = await prisma.local.create({
            data: { ...req.body },
        })

        return res.json(local);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.put('/local/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const local = await prisma.local.update({
            where: { id: Number(id) },
            data: { ...req.body },
        })

        return res.json(local);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});

app.delete('/local/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const local = await prisma.local.delete({
            where: { id: Number(id) },
        })
        return res.json(local);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request.',
            error
        })
    }
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Servidor está executando na porta ${PORT}`);
});