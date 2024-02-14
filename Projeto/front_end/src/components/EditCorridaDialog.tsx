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


export default function EditCorridaDialog({ open, onClose, id }: Props) {
    const [data, setData] = useState("");
    const [duracao, setDuracao] = useState<number>();
    const [distancia, setDistancia] = useState<number>();
    const [bpm, setBpm] = useState<number>();
    const [local, setLocal] = useState<number>();
    const [equipamento, setEquipamento] = useState<number>();

    const [equipamentos, setEquipamentos] = useState<any>([]);
    const [locais, setLocais] = useState<any>([]);

    const getCorrida = async () => {
        const resp = await getOne('corrida', id);
        console.log(resp);

        setData(resp?.data);
        setDuracao(resp?.duracao);
        setDistancia(resp?.distancia);
        setBpm(resp?.bpm);
        setLocal(+resp?.localId);
        setEquipamento(+resp?.equipamentoId);
    }


    const getEquipamento = async () => {
        const equipamentos = await get('equipamento', {});
        setEquipamentos(equipamentos);
    }

    const getLocais = async () => {
        const locais = await get('local', {});
        setLocais(locais);
    }

    const criar = async () => {

        const query = {
            data: data,
            duracao: duracao,
            distancia: distancia,
            bpm: bpm,
            localId: local,
            equipamentoId: equipamento
        }

        await put("corrida", query, id);
        onClose();
        limpar();
    }

    const limpar = () => {
        setData("");
        setDuracao(0);
        setDistancia(0);
        setBpm(0);
        setLocal(0);
        setEquipamento(0);
    }



    useEffect(() => {
        getCorrida();
        getEquipamento();
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
                <DialogTitle>Editar Corrida</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ p: 1 }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Data"
                            sx={{ mt: 2 }}
                            type='date'
                            value={data}
                            onChange={(e) => { setData(e.target.value) }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Duração"
                            sx={{ mt: 2 }}
                            type='number'
                            value={duracao || ''}
                            onChange={(e) => { setDuracao(+e.target.value) }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Distacia"
                            sx={{ mt: 2 }}
                            type='number'
                            value={distancia || ''}
                            onChange={(e) => { setDistancia(+e.target.value) }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Média BPM"
                            sx={{ mt: 2 }}
                            type='number'
                            value={bpm || ''}
                            onChange={(e) => { setBpm(+e.target.value) }}
                        />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label">Local</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={local || 0}
                                label="Local"
                                onChange={(e) => setLocal(+e.target.value)}
                            >
                                <MenuItem key={0} value={0}>
                                    
                                </MenuItem>
                                {locais.map((local: any, index: React.Key | null | undefined) => (
                                    <MenuItem key={index} value={+local.id}>
                                        {local.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label">Equipamento</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={equipamento ?? 0}
                                label="Equipamento"
                                onChange={(e) => setEquipamento(+e.target.value)}
                            >
                                <MenuItem key={0} value={0}>
                                    
                                </MenuItem>
                                {equipamentos.map((equipamento: any, index: React.Key | null | undefined) => (
                                    <MenuItem key={index} value={+equipamento.id}>
                                        {equipamento.nome}
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