
"use client";

import ResponsiveAppBar from '@/components/navBar';
import { Box, Divider, IconButton, ThemeProvider, Typography, createTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { GridColDef, GridValueGetterParams, DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { get } from '../../services/apiRequest'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteCorridaDialog from '@/components/DeleteCorridaDialog';
import AddIcon from '@mui/icons-material/Add';
import NewCorridaDialog from '@/components/NewCorridaDialog';
import EditCorridaDialog from '@/components/EditCorridaDialog';
import NewEquipamentoDialog from '@/components/NewEquipamentoDialog';
import DeleteEquipamentoDialog from '@/components/DeleteEquipamentoDialog';
import EditEquipamentoDialog from '@/components/EditEquipamentoDialog';
import { pink, red } from '@mui/material/colors';

export default function Page() {

  const theme = createTheme({
    palette: {
      primary: red,
      secondary: pink,
    },
  });

  const [data, setData] = useState<any>({});
  const [corrida, setCorrida] = useState<number>(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);


  const getEquipamento = async () => {
    const equipamentos = await get('equipamento', {});
    setData(equipamentos);
  }

  const columns: GridColDef[] = [
    {
      field: 'nome', headerName: 'Nome', width: 300
    },
    { field: 'dtPrimeiroUso', headerName: 'Data do primeiro uso', width: 300 },
    {
      field: 'distanciaUso',
      headerName: 'Distância de uso',
      width: 300,
    },
    {
      field: 'editar',
      headerName: 'Editar',
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton aria-label="edit" color='warning' onClick={() => { setOpenEdit(true); setCorrida(params.row.id) }}>
            <EditIcon />
          </IconButton>
        );
      }
    },
    {
      field: 'excluir',
      headerName: 'Excluir',
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton aria-label="delete" color='error' onClick={() => { setOpenDelete(true); setCorrida(params.row.id) }}>
            <DeleteIcon />
          </IconButton>
        );
      }
    },
  ];



  useEffect(() => {
    getEquipamento();
  }, [openDelete, openNew, openEdit]);

  return (
    <ThemeProvider theme={theme}>
      <NewEquipamentoDialog open={openNew} onClose={() => setOpenNew(false)} />
      <DeleteEquipamentoDialog open={openDelete} onClose={() => setOpenDelete(false)} id={corrida} />
      <EditEquipamentoDialog open={openEdit} onClose={() => setOpenEdit(false)} id={corrida} />
      <ResponsiveAppBar></ResponsiveAppBar>
      <Typography fontFamily='fantasy' sx={{ textAlign: 'center', mt:5 }} variant="h1" gutterBottom>
        Equipamentos
      </Typography>
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" color='primary' startIcon={<AddIcon />} sx={{ width: '15%', ml: '70%' }} onClick={() => setOpenNew(true)}>
          Novo Equipamento
        </Button>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          sx={{ width: '70%', display: 'flex', m: 'auto', mt: 3 }}
        />
      </Box>
    </ThemeProvider>

  )
}