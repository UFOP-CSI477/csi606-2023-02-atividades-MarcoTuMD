import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, FormControl, FormLabel, TextField, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import { get, post } from '../services/apiRequest'
import { useEffect, useState } from 'react';

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


export default function NewCidadeDialog({ open, onClose }: Props) {

    const [nome, setNome] = useState("");
    const [estado, setEstado] = useState(0);

    const [estados, setEstados] = useState<any>([]);


    const getEstados = async () => {
        const estados = await get('estados', {});
        setEstados(estados);
    }

    

    useEffect(() => {
        getEstados();
    }, []);

    const criar = async () => {
        const query = {
            nome: nome,
            estadoId: estado
        }

        await post("cidades", query);
        onClose();
        limpar();
    }

    const limpar = () => {
        setNome("");
        setEstado(0);
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
                <DialogTitle>Nova Cidade</DialogTitle>
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
                        

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={estado}
                                label="Estado"
                                onChange={(e) => setEstado(+e.target.value)}
                            >
                                {estados.map((estado: any, index: React.Key | null | undefined) => (
                                    <MenuItem key={index} value={estado.id}>
                                        {estado.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


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