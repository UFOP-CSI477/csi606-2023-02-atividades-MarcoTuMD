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


export default function NewLocalColetaDialog({ open, onClose }: Props) {

    const [nome, setNome] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [cidade, setCidade] = useState(0);

    const [cidades, setCidades] = useState<any>([]);

    const getCidades = async () => {
        const cidades = await get('cidades', {});
        setCidades(cidades);
    }


    useEffect(() => {
        getCidades();
        
    }, []);

    const criar = async () => {
        const query = {
            nome: nome,
            rua: rua,
            numero: numero,
            complemento: complemento,
            cidadeId: cidade,
        }

        await post("locaisColeta", query);
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
                <DialogTitle>Novo Local de Coleta</DialogTitle>
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
                    <Button variant='contained' onClick={criar}>Criar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}