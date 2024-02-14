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
import { get, getOne, post, put } from '../services/apiRequest'
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


export default function EditEstadoDialog({ open, onClose, id }: Props) {

    const [nome, setNome] = useState("");
    const [sigla, setSigla] = useState("");

    const getEstado= async () => {
        const resp = await getOne('estados', id);
        console.log(resp);

        setNome(resp?.nome);
        setSigla(resp?.sigla);
    }

    const criar = async () => {

        const query = {
            nome: nome,
            sigla: sigla
        }

        await put("estados", query, id);
        onClose();
        limpar();
    }
    const limpar = () => {
        setNome("");
        setSigla("");
    }


    useEffect(() => {
        getEstado();
    }, [open]);

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
                <DialogTitle>Editar Estado</DialogTitle>
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
                            label="Sigla"
                            sx={{ mt: 2 }}
                            type='text'
                            value={sigla}
                            onChange={(e) => { setSigla(e.target.value) }}
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