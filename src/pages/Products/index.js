/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import ProductsAction from '../../store/ducks/products';
import DataTableComponent from '../../components/DataTable';
import ClientsActions from '../../store/ducks/clients';

import {
  Container, RowContainer, CardHeader, PageTitle,
} from './styles';

export default function Products({ history }) {
  const dispatch = useDispatch();
  const productsStore = useSelector((store) => store.products.productsData);
  const productsLoading = useSelector((store) => store.products.loading);

  useEffect(() => {
    dispatch(ProductsAction.getProductsRequest());
  }, []);

  const columns = [
    { title: 'Title', field: 'product_name' },
    {
      title: 'Preço solicitado',
      field: 'product_requested_price',
      render: (rowData) => <span>{`R$ ${parseFloat(rowData.product_requested_price).toFixed(2)}` }</span>,
    },
    {
      title: 'Preço negociado',
      field: 'product_final_price',
      render: (rowData) => {
        console.log(rowData);
        return <span>{rowData.status ? 'Em aberto' : `R$ ${parseFloat(rowData.product_final_price).toFixed(2)}` }</span>;
      },
    },
    {
      title: 'Criado em',
      field: 'created_at',
      render: (rowData) => <span>{format(parseISO(rowData.created_at), 'dd/MM/yyyy')}</span>,
    },
    {
      title: 'Status',
      field: 'status',
      render: (rowData) => <span>{rowData.status ? 'Ativo' : 'Finalizado'}</span>,
    },
    {
      title: 'Ações',
      render: (rowData) => (
        <Tooltip title="Ver detalhes do produto" placement="top">
          <IconButton onClick={() => handleProductDetail(rowData)}>
            <Visibility />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  function handleProductDetail(row) {
    dispatch(ProductsAction.setProductSelect(row));
    return history.push(`/app/product-detail/${row.id}`);
  }

  return (
    <Container>
      <PageTitle>Dados dos produtos</PageTitle>
      <RowContainer>
        <CardHeader>
          <h3>{productsStore.length}</h3>
          <p>Todos produtos</p>
        </CardHeader>
        <CardHeader>
          <h3>{productsStore.filter((product) => product.status).length}</h3>
          <p>Produtos ativo</p>
        </CardHeader>
        <CardHeader>
          <h3>{productsStore.filter((product) => !product.status).length}</h3>
          <p>Produtos Finalizados</p>
        </CardHeader>
      </RowContainer>
      <DataTableComponent columns={columns} data={productsStore} loading={productsLoading} />
    </Container>
  );
}
