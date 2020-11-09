import React, { useEffect, useState } from 'react';
import {
  Image,
  AttachMoney,
  HourglassEmpty,
  CheckCircleOutline,
  Block,
  Visibility,
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  IconButton, Link, Radio, RadioGroup, Tooltip,
} from '@material-ui/core';
import ClientAction from '../../store/ducks/clients';
import ProductsAction from '../../store/ducks/products';

import {
  Container,
  ClientDataContainer,
  RowContainer,
  TitleText,
  SubtitleText,
  LineContainer,
  ActionContainer,
  ButtonAction,
  CreditInput,
} from './styles';
import DataTableComponent from '../../components/DataTable';

export default function ClientDetail({ history }) {
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const [clientData, setClientData] = useState(null);
  const [creditInputStatus, setCreditInputStatus] = useState(false);
  const [creditData, setCreditData] = useState({
    operation: 'add',
    value: 0,
  });

  const clientStore = useSelector((store) => store.clients.clientData);
  const productStore = useSelector((store) => store.products.productsData);
  const clientLoading = useSelector((store) => store.clients.loading);

  useEffect(() => {
    dispatch(ClientAction.getClientDataRequest(clientId));
  }, []);

  useEffect(() => {
    setClientData(clientStore);
  }, [clientStore]);

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
      title: 'Status',
      field: 'status',
      render: (rowData) => <span>{rowData.status ? 'Ativo' : 'Finalizado'}</span>,
    },
    {
      title: 'Ações',
      render: (rowData) => (
        <Tooltip title="Ver detalhes do produto" placement="top">
          <IconButton onClick={() => handleProductDetail(rowData.id)}>
            <Visibility />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  function handleProductDetail(id) {
    const product = productStore.filter((prod) => prod.id === id)[0];
    console.log(product);
    console.log(productStore);
    dispatch(ProductsAction.setProductSelect(product));
    return history.push(`/app/product-detail/${id}`);
  }

  function handleCreditClient() {
    dispatch(ClientAction.creditOperationRequest(clientData.id, creditData));
    setCreditData({
      operation: 'add',
      value: 0,
    });

    return setCreditInputStatus(false);
  }

  function handleStatusClient(status) {
    return dispatch(ClientAction.updateStatusClientRequest(clientData.id, status));
  }

  function getStatusClient(status) {
    if (status === 'pendding') return 'Pendente';
    if (status === 'analyzing') return 'Em analise';
    if (status === 'actived') return 'Ativado';
  }

  return clientData && (
    <Container>
      <TitleText>Dados do cliente</TitleText>
      <ClientDataContainer>
        <LineContainer>
          <RowContainer>
            <TitleText>Nome:</TitleText>
            <SubtitleText>{clientData.full_name}</SubtitleText>
          </RowContainer>
          <RowContainer>
            <TitleText>Documento:</TitleText>
            <SubtitleText>{clientData.document}</SubtitleText>
          </RowContainer>
          <RowContainer>
            <TitleText>Celular:</TitleText>
            <SubtitleText>{clientData.cellphone}</SubtitleText>
          </RowContainer>
          <RowContainer>
            <TitleText>Status:</TitleText>
            <SubtitleText>{getStatusClient(clientData.status)}</SubtitleText>
          </RowContainer>
        </LineContainer>

        <LineContainer>
          <RowContainer>
            <TitleText>Email:</TitleText>
            <SubtitleText>{clientData.email}</SubtitleText>
          </RowContainer>
          <RowContainer>
            <TitleText>Creditos:</TitleText>
            <SubtitleText>
              R$
              {' '}
              {parseFloat(clientData.credit).toFixed(2)}
            </SubtitleText>
          </RowContainer>
          <RowContainer>
            <TitleText>Nota:</TitleText>
            <SubtitleText>{clientData.rating}</SubtitleText>
          </RowContainer>
        </LineContainer>

      </ClientDataContainer>

      <TitleText>Ações</TitleText>

      <ActionContainer>
        <RowContainer justifyContent="center">
          {clientData.documentFile ? (
            <Link href={clientData.documentFile.url} target="_blank">
              <ButtonAction>
                <Image />
                Foto documento
              </ButtonAction>
            </Link>
          ) : (
            <ButtonAction disabled={!clientData.documentFile}>
              <Image />
              Foto documento
            </ButtonAction>
          )}
          <ButtonAction onClick={() => setCreditInputStatus(true)}>
            <AttachMoney />
            Operações de credito
          </ButtonAction>
        </RowContainer>
        <TitleText style={{
          marginTop: 20,
          marginBottom: 5,
          fontSize: 14,
        }}
        >
          Mudar status da conta para

        </TitleText>
        <RowContainer justifyContent="center">
          <ButtonAction onClick={() => handleStatusClient('pendding')} bkColor="#edcb23">
            <Block />
            Pendente
          </ButtonAction>
          <ButtonAction onClick={() => handleStatusClient('analyzing')} bkColor="#1ebacc">
            <HourglassEmpty />
            Analisando
          </ButtonAction>
          <ButtonAction onClick={() => handleStatusClient('actived')} bkColor="#19e5a8">
            <CheckCircleOutline />
            Aprovado
          </ButtonAction>
        </RowContainer>
      </ActionContainer>
      <TitleText style={{
        marginBottom: 20,
      }}
      >
        Produtos Cliente
      </TitleText>
      <DataTableComponent columns={columns} data={clientData.products} loading={clientLoading} />
      <Dialog open={creditInputStatus} onClose={() => setCreditInputStatus(false)}>
        <DialogTitle>Creditos cliente</DialogTitle>
        <DialogContent>
          <FormLabel component="legend">O que deseja fazer</FormLabel>
          <RadioGroup
            value={creditData.operation}
            onChange={({ target }) => setCreditData({
              ...creditData,
              operation: target.value,
            })}
          >
            <div>
              <FormControlLabel value="add" control={<Radio color="primary" />} label="Adicionar" />
              <FormControlLabel value="sub" control={<Radio color="primary" />} label="Remover" />
            </div>
          </RadioGroup>
          <FormLabel component="legend">Valor da operação</FormLabel>
          <CreditInput
            thousandSeparator
            prefix="R$ "
            onValueChange={(value) => setCreditData({
              ...creditData,
              value: value.floatValue,
            })}
            // displayType="text"
            decimalScale="2"
            fixedDecimalScale
            isNumericString
            allowNegative={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setCreditInputStatus(false);
            setCreditData({
              ...creditData,
              value: 0,
            });
          }}
          >
            Cancelar

          </Button>
          <Button color="primary" onClick={() => handleCreditClient()}>Finalizar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
