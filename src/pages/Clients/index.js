/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import DataTableComponent from '../../components/DataTable';
import ClientsActions from '../../store/ducks/clients'

import { Container, RowContainer, CardHeader, PageTitle } from './styles';

export default function Clients() {
  const dispatch = useDispatch()
  const clientsStore = useSelector(store => store.clients.clientsData)
  const clientsLoading = useSelector(store => store.clients.loading)

  useEffect(() => {
    dispatch(ClientsActions.getClientsRequest())
  }, [])

  const columns = [
    { title: 'Nome', field: 'full_name' },
    { title: 'Documento', field: 'document' },
    { title: 'Celular', field: 'cellphone' },
    { title: 'Email', field: 'email' },
    { title: 'Creditos', field: 'credit' },
    { title: 'Status', field: 'status' },
  ]

  return (
    <Container>
      <PageTitle>Dados dos clientes</PageTitle>
      <RowContainer>
        <CardHeader>
          <h3>{clientsStore.length}</h3>
          <p>Todos os clientes</p>
        </CardHeader>
        <CardHeader>
          <h3>{clientsStore.filter(clients => clients.status === "actived" ).length}</h3>
          <p>Clientes ativo</p>
        </CardHeader>
        <CardHeader>
          <h3>{clientsStore.filter(clients => clients.status !== "actived" ).length}</h3>
          <p>Clientes pendentes</p>
        </CardHeader>
      </RowContainer>
      <DataTableComponent columns={columns} data={clientsStore} loading={clientsLoading} />
    </Container>
  );
}
