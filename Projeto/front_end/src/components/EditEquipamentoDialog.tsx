import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, FormControl, FormLabel, TextField, InputAdornment } from '@mui/material';
import { getOne, post, put } from '../services/apiRequest'
import { useEffect, useState } from 'react';
import { log } from 'console';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    open: boolean,
    onClose: (() => void),
    id: number
}


export default function EditEquipamentoDialog({ open, onClose, id }: Props) {
    const [nome, setNome] = useState("");
    const [dtPrimeiroUso, setDtPrimeiroUso] = useState("");
    const [distanciaUso, setDistanciaUso] = useState(0);

    const getEquipamento = async () => {
        const resp = await getOne('equipamento', id);
        console.log(resp);

        setNome(resp?.nome);
        setDtPrimeiroUso(resp?.dtPrimeiroUso);
        setDistanciaUso(resp?.distanciaUso);
    }

    useEffect(() => {
        getEquipamento()
    }, [open]);

    const criar = async () => {

        const query = {
            nome: nome,
            dtPrimeiroUso: dtPrimeiroUso,
            distanciaUso: distanciaUso
        }

        await put("equipamento", query, id);
        onClose();
        limpar();
    }

    const limpar = () => {
        setNome("");
        setDtPrimeiroUso("");
        setDistanciaUso(0);
    }


    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => { onClose(); limpar() }}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Editar Equipamento</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ p: 1 }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Nome"
                            sx={{ mt: 2 }}
                            type='text'
                            value={nome}
                            onChange={(e) => { setNome(e.target.value) }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Data do primeiro uso"
                            sx={{ mt: 2 }}
                            type='date'
                            value={dtPrimeiroUso}
                            onChange={(e) => { setDtPrimeiroUso(e.target.value) }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Distância de uso"
                            sx={{ mt: 2 }}
                            type='number'
                            value={distanciaUso}
                            onChange={(e) => { setDistanciaUso(+e.target.value) }}
                        />

                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => { onClose(); limpar() }}>Cancelar</Button>
                    <Button variant='contained' onClick={criar}>Editar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}