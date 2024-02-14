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


export default function EditDoacoesDialog({ open, onClose, id }: Props) {
    const [pessoa, setPessoa] = useState(0);
    const [local, setLocal] = useState(0);
    const [data, setData] = useState("");

    const [pessoas, setPessoas] = useState<any>([]);
    const [locais, setLocais] = useState<any>([]);



    const getDoacao = async () => {
        const resp = await getOne('doacoes', id);

        setPessoa(resp?.pessoaId);
        setLocal(resp?.localId);
        setData(resp?.data);
    }


    const getPessoas = async () => {
        const pessoas = await get('pessoas', {});
        setPessoas(pessoas);
    }

    const getLocais = async () => {
        const locais = await get('locaisColeta', {});
        setLocais(locais);
    }

    const criar = async () => {

        const query = {
            pessoaId: pessoa,
            localId: local,
            data: data
        }

        await put("doacoes", query, id);
        onClose();
        limpar();
    }

    const limpar = () => {
        setPessoa(0);
        setLocal(0);
        setData("");
    }



    useEffect(() => {
        getDoacao();
        getPessoas();
        getLocais();
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
                <DialogTitle>Editar Doação</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ p: 1 }}>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label">Pessoa</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={pessoa}
                                label="Pessoa"
                                onChange={(e) => setPessoa(+e.target.value)}
                            >
                                {pessoas.map((pessoa: any, index: React.Key | null | undefined) => (
                                    <MenuItem key={index} value={pessoa.id}>
                                        {pessoa.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label">Local</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={local}
                                label="Local"
                                onChange={(e) => setLocal(+e.target.value)}
                            >
                                {locais.map((local: any, index: React.Key | null | undefined) => (
                                    <MenuItem key={index} value={local.id}>
                                        {local.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            required
                            id="outlined-required"
                            label="Data"
                            sx={{ mt: 2 }}
                            type='date'
                            value={data}
                            onChange={(e) => { setData(e.target.value) }}
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