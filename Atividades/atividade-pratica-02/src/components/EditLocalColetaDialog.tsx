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


export default function EditLocalColetaDialog({ open, onClose, id }: Props) {
    const [nome, setNome] = useState<string>("");
    const [rua, setRua] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [cidade, setCidade] = useState<number>(0);

    const [cidades, setCidades] = useState<any>([]);
    
    const getLocalColeta = async () => {
        const resp = await getOne('locaisColeta', id);

        setNome(resp?.nome);
        setRua(resp?.rua);
        setNumero(resp?.numero);
        setComplemento(resp?.complemento);
        setCidade(resp?.cidadeId);
    }


    const getCidades = async () => {
        const cidades = await get('cidades', {});
        setCidades(cidades);
    }

   

    const criar = async () => {

        const query = {
            nome: nome,
            rua: rua,
            numero: numero,
            complemento: complemento,
            cidadeId: cidade,
        }

        await put("locaisColeta", query, id);
        onClose();
        limpar();
    }

    const limpar = () => {
        setNome("");
        setRua("");
        setNumero("");
        setComplemento("");
        setCidade(0);
    }



    useEffect(() => {
        if (open) {
            getLocalColeta();
            getCidades();
        }
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
                <DialogTitle>Editar Local de Coleta</DialogTitle>
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
                            label="Rua"
                            sx={{ mt: 2 }}
                            type='text'
                            value={rua}
                            onChange={(e) => { setRua(e.target.value) }}
                        />

                        <TextField
                            required
                            id="outlined-required"
                            label="Número"
                            sx={{ mt: 2 }}
                            type='text'
                            value={numero}
                            onChange={(e) => { setNumero(e.target.value) }}
                        />


                        <TextField
                            required
                            id="outlined-required"
                            label="Complemento"
                            sx={{ mt: 2 }}
                            type='text'
                            value={complemento}
                            onChange={(e) => { setComplemento(e.target.value) }}
                        />

                

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label">Cidade</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cidade}
                                label="Cidade"
                                onChange={(e) => setCidade(+e.target.value)}
                            >
                                {cidades.map((cidade: any, index: React.Key | null | undefined) => (
                                    <MenuItem key={index} value={cidade.id}>
                                        {cidade.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


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