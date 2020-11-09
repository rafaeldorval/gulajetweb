/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Launch } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import ClientAction from '../../store/ducks/clients';
import ProductsAction from '../../store/ducks/products';
import DataTableComponent from '../../components/DataTable';
import ClientsActions from '../../store/ducks/clients';

import {
  Container, RowContainer, CardHeader, PageTitle,
} from './styles';

export default function Clients({ history }) {
  const dispatch = useDispatch();
  const clientsStore = useSelector((store) => store.clients.clientsData);
  const clientsLoading = useSelector((store) => store.clients.loading);

  useEffect(() => {
    dispatch(ClientsActions.getClientsRequest());
    dispatch(ProductsAction.getProductsRequest());
  }, []);

  const columns = [
    { title: 'Nome', field: 'full_name' },
    { title: 'Documento', field: 'document' },
    { title: 'Celular', field: 'cellphone' },
    { title: 'Email', field: 'email' },
    {
      title: 'Creditos',
      field: 'credit',
      render: (rowData) => (
        <span>
          R$
          {' '}
          {parseFloat(rowData.credit).toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Status',
      field: 'status',
      render: (rowData) => <span>{getStatusClient(rowData.status)}</span>,
    },
    {
      title: 'Ações',
      render: (rowData) => (
        <Tooltip title="Abrir detalhes cliente" placement="top">
          <IconButton onClick={() => handleClientDetail(rowData)}>
            <Launch />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  function handleClientDetail(row) {
    dispatch(ClientAction.getClientDataRequest(row.id));
    return history.push(`/app/client-detail/${row.id}`);
  }

  function getStatusClient(status) {
    if (status === 'pendding') return 'Pendente';
    if (status === 'analyzing') return 'Em analise';
    if (status === 'actived') return 'Ativado';
  }

  return (
    <Container>
      <PageTitle>Dados dos clientes</PageTitle>
      <RowContainer>
        <CardHeader>
          <h3>{clientsStore.length}</h3>
          <p>Todos os clientes</p>
        </CardHeader>
        <CardHeader>
          <h3>{clientsStore.filter((clients) => clients.status === 'actived').length}</h3>
          <p>Clientes ativo</p>
        </CardHeader>
        <CardHeader>
          <h3>{clientsStore.filter((clients) => clients.status !== 'actived').length}</h3>
          <p>Clientes pendentes</p>
        </CardHeader>
      </RowContainer>
      <DataTableComponent columns={columns} data={clientsStore} loading={clientsLoading} />
    </Container>
  );
}
