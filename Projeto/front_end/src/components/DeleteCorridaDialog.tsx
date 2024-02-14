import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { getOne, remove } from '../services/apiRequest'
import { useEffect } from 'react';

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


export default function DeleteCorridaDialog({ open, onClose, id }: Props) {
  const [info, setInfo] = React.useState<any>({});
  const deletar = async () => {
    await remove("corrida", id);
    onClose();
  }

  const getCorrida = async () => {
    const resp = await getOne('corrida', id);
    console.log(resp);
    setInfo(resp);
  }

  useEffect(() => {
    getCorrida()
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Excluir Corrida?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Local</TableCell>
                    <TableCell>Distância</TableCell>
                    <TableCell>BPM Médio</TableCell>
                    <TableCell>Equipamento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key={info?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{info?.data}</TableCell>
                    <TableCell >{info?.localId}</TableCell>
                    <TableCell>{info?.distancia}</TableCell>
                    <TableCell >{info?.bpm}</TableCell>
                    <TableCell >{info?.equipamentoId}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={onClose}>Cancelar</Button>
          <Button variant='contained' onClick={deletar}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}