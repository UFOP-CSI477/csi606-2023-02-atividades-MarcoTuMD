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
import { post } from '../services/apiRequest'
import { useState } from 'react';

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
}


export default function NewTipoSanguineoDialog({ open, onClose }: Props) {
    const [tipo, setTipo] = useState("");
    const [fator, setFator] = useState("");

    const criar = async () => {
        const query = {
            tipo: tipo,
            fator: fator
        }

        await post("tiposSanguineos", query);
        onClose();
        limpar();
    }

    const limpar = () => {
        setTipo("");
        setFator("");
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
                <DialogTitle>Novo Tipo Sanguíneo</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ p: 1 }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Tipo"
                            sx={{ mt: 2 }}
                            type='text'
                            value={tipo}
                            onChange={(e) => { setTipo(e.target.value) }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Fator"
                            sx={{ mt: 2 }}
                            type='text'
                            value={fator}
                            onChange={(e) => { setFator(e.target.value) }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => { onClose(); limpar() }}>Cancelar</Button>
                    <Button variant='contained' onClick={criar}>Criar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}