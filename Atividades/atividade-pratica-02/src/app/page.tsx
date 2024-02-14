
"use client";

import ResponsiveAppBar from '@/components/navBar';
import { Box, IconButton, ThemeProvider, Typography, createTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { GridColDef, GridValueGetterParams, DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { get } from '../services/apiRequest'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { pink, purple, red } from '@mui/material/colors';
import NewDoacaoDialog from '@/components/NewDoacaoDialog';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import DeleteDoacaoDialog from '@/components/DeleteDoacaoDialog';
import EditDoacoesDialog from '@/components/EditDoacoesDialog';

export default function Page() {

  const [data, setData] = useState<any>({});
  const [corrida, setCorrida] = useState<number>(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [equipamentos, setEquipamentos] = useState<any>({});
  const [doacoes, setDoacoes] = useState<any>({});



  const getDoacoes = async () => {
    const doacoes = await get('doacoes', {});
    setData(doacoes);
  }

  const columns: GridColDef[] = [
    {
      field: 'pessoaId', headerName: 'Pessoa', width: 400
    },
    { field: 'localId', headerName: 'Local', width: 400 },
    {
      field: 'data',
      headerName: 'Data',
      width: 100,
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
    getDoacoes();
  }, [openDelete, openNew, openEdit]);

  return (
    <>
      <NewDoacaoDialog open={openNew} onClose={() => setOpenNew(false)}></NewDoacaoDialog>
      <DeleteDoacaoDialog open={openDelete} onClose={() => setOpenDelete(false)} id={corrida}></DeleteDoacaoDialog>
      <EditDoacoesDialog open={openEdit} onClose={() => setOpenEdit(false)} id={corrida}></EditDoacoesDialog>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Typography fontFamily='fantasy' sx={{ textAlign: 'center', mt: 5 }} variant="h1" gutterBottom>
        Doações
      </Typography>
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" color='primary' startIcon={<AddIcon />} sx={{ width: '15%', ml: '70%' }} onClick={() => setOpenNew(true)}>
          Nova Doação
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
    </>

  )
}