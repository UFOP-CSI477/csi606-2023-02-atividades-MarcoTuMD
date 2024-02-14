
"use client";

import ResponsiveAppBar from '@/components/navBar';
import { Box, IconButton, ThemeProvider, Typography, createTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { GridColDef, GridValueGetterParams, DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { get } from '../services/apiRequest'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteCorridaDialog from '@/components/DeleteCorridaDialog';
import AddIcon from '@mui/icons-material/Add';
import NewCorridaDialog from '@/components/NewCorridaDialog';
import EditCorridaDialog from '@/components/EditCorridaDialog';
import { pink, purple, red } from '@mui/material/colors';

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

  const [equipamentos, setEquipamentos] = useState<any>({});
  const [locais, setLocais] = useState<any>({});


  const getCorridas = async () => {
    const corridas = await get('corrida', {});
    setData(corridas);
  }

  const getEquipamento = async () => {
    const equipamentos = await get('equipamento', {});
    setEquipamentos(equipamentos);
  }

  const getLocais = async () => {
    const locais = await get('local', {});
    setLocais(locais);
  }

  const columns: GridColDef[] = [
    {
      field: 'data', headerName: 'Data', width: 220
    },
    { field: 'localId', headerName: 'Local', width: 220 },
    {
      field: 'distancia',
      headerName: 'Distância',
      width: 100,
    },
    {
      field: 'bpm',
      headerName: 'BPM Médio',
      width: 100,
    },
    {
      field: 'equipamentoId',
      headerName: 'Equipamento',
      width: 220,
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
    getCorridas();
    getEquipamento();
    getLocais();
  }, [openDelete, openNew, openEdit]);

  return (
    <ThemeProvider theme={theme}>
      <NewCorridaDialog open={openNew} onClose={() => setOpenNew(false)} />
      <DeleteCorridaDialog open={openDelete} onClose={() => setOpenDelete(false)} id={corrida} />
      <EditCorridaDialog open={openEdit} onClose={() => setOpenEdit(false)} id={corrida} />
      <ResponsiveAppBar></ResponsiveAppBar>
      <Typography fontFamily='fantasy' sx={{ textAlign: 'center', mt:5 }} variant="h1" gutterBottom>
        Corridas
      </Typography>
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" color='primary' startIcon={<AddIcon />} sx={{ width: '15%', ml: '70%' }} onClick={() => setOpenNew(true)}>
          Nova Corrida
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