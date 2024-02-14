
"use client";

import ResponsiveAppBar from '@/components/navBar';
import { Box, IconButton, ThemeProvider, Typography, createTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { GridColDef, GridValueGetterParams, DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { get } from '../../services/apiRequest'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import NewTipoSanguineoDialog from '@/components/NewTipoSanguineoDialog';
import Delete from '@mui/icons-material/Delete';
import DeleteTipoSanguineoDialog from '@/components/DeleteTipoSanguineoDialog';
import Edit from '@mui/icons-material/Edit';
import EditTipoSanguineoDialog from '@/components/EditTipoSanguineoDialog';
import NewEstadoDialog from '@/components/NewEstadoDialog';
import DeleteEstadoDialog from '@/components/DeleteEstadoDialog';
import EditEstadoDialog from '@/components/EditEstadoDialog';


export default function Page() {

    const [data, setData] = useState<any>({});
    const [corrida, setCorrida] = useState<number>(0);
    const [openDelete, setOpenDelete] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [equipamentos, setEquipamentos] = useState<any>({});
    const [doacoes, setDoacoes] = useState<any>({});



    const getEstados = async () => {
        const estados = await get('estados', {});        
        setData(estados);
    }

    const columns: GridColDef[] = [
        {
            field: 'nome', headerName: 'Nome', width: 420
        },
        { field: 'sigla', headerName: 'Sigla', width: 420 },
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
        getEstados();
    }, [openDelete, openNew, openEdit]);

    return (
        <>
            <NewEstadoDialog open={openNew} onClose={() => setOpenNew(false)} />
            <DeleteEstadoDialog open={openDelete} onClose={() => setOpenDelete(false)} id={corrida} />
            <EditEstadoDialog open={openEdit} onClose={() => setOpenEdit(false)} id={corrida} />
            <ResponsiveAppBar></ResponsiveAppBar>
            <Typography fontFamily='fantasy' sx={{ textAlign: 'center', mt: 5 }} variant="h1" gutterBottom>
                Estados
            </Typography>
            <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column' }}>
                <Button variant="contained" color='primary' startIcon={<AddIcon />} sx={{ width: '15%', ml: '70%' }} onClick={() => setOpenNew(true)}>
                    Novo Estado
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