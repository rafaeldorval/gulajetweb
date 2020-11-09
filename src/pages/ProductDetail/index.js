import React, { useEffect, useState } from 'react';
import {
  AccountCircle,
  AttachMoney,
  Star,
  CheckCircleOutline,
  Block,
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Link,
  RadioGroup,
} from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import ClientAction from '../../store/ducks/clients';
import ProductAction from '../../store/ducks/products';

import {
  Container,
  ClientDataContainer,
  RowContainer,
  TitleText,
  SubtitleText,
  LineContainer,
  ActionContainer,
  ButtonAction,
  DescriptionText,
  CloseInput,
  CreditInput,
} from './styles';

export default function ProductDetail({ history }) {
  const dispatch = useDispatch();
  const [creditInputStatus, setCreditInputStatus] = useState(false);
  const [closeProductStatus, setCloseProductStataus] = useState(false);
  const [ratingStatus, setRatingStatus] = useState(false);
  const [creditValue, setCreditValue] = useState(0);
  const [closedNote, setClosedNote] = useState('');

  const productStore = useSelector((store) => store.products.productData);
  const productLoading = useSelector((store) => store.products.loading);

  useEffect(() => {
    if (!productStore) return history.push('/app/products');
  }, []);

  function hadleSaleProduct() {
    dispatch(ProductAction.saleProductRequest(productStore.id, { value: creditValue }));
    setCreditInputStatus(0);
    return setCreditInputStatus(false);
  }

  function handleCloseProduct(status) {
    if (status) {
      dispatch(ProductAction.updateStatusProductRequest(productStore.id, { status: true }));
    } else {
      dispatch(ProductAction.updateStatusProductRequest(productStore.id, { status: false, note: closedNote }));
    }
    setClosedNote('');
    return setCloseProductStataus(false);
  }

  function handleClientDetail() {
    const clientId = productStore.createdBy.id;
    dispatch(ClientAction.getClientDataRequest(clientId));
    return history.push(`/app/client-detail/${clientId}`);
  }

  return productStore && (
    <Container>
      <TitleText>Dados do producto</TitleText>
      <ClientDataContainer>
        <LineContainer>
          <RowContainer>
            <TitleText>Titulo:</TitleText>
            <SubtitleText>{productStore.product_name}</SubtitleText>
          </RowContainer>
          <RowContainer>
            <TitleText>Criado em:</TitleText>
            <SubtitleText>{format(parseISO(productStore.created_at), 'dd/MM/yyyy')}</SubtitleText>
          </RowContainer>
          <RowContainer>
            <TitleText>Criado por:</TitleText>
            <SubtitleText>{productStore.createdBy.full_name}</SubtitleText>
          </RowContainer>

        </LineContainer>

        <LineContainer>
          <RowContainer>
            <TitleText>Preço solicitado:</TitleText>
            <SubtitleText>
              R$
              {parseFloat(productStore.product_requested_price).toFixed(2)}
            </SubtitleText>
          </RowContainer>
          <RowContainer>
            <TitleText>Preço negociado:</TitleText>
            <SubtitleText>{productStore.status ? 'Produto em aberto' : `R$${parseFloat(productStore.product_final_price).toFixed(2)}`}</SubtitleText>
          </RowContainer>
          <RowContainer>
            <TitleText>Status:</TitleText>
            <SubtitleText>{productStore.status ? 'Em aberto' : 'Finalizado'}</SubtitleText>
          </RowContainer>
        </LineContainer>

      </ClientDataContainer>

      <RowContainer justifyContent="center">
        <TitleText>Descrição:</TitleText>
      </RowContainer>
      <RowContainer justifyContent="center">
        <DescriptionText>{productStore.description}</DescriptionText>
      </RowContainer>
      {productStore.employee_ending_note && (
      <RowContainer justifyContent="center">
        <TitleText>Nota de finalização:</TitleText>
      </RowContainer>

      )}
      {productStore.employee_ending_note && (
      <RowContainer justifyContent="center">
        <DescriptionText>{productStore.employee_ending_note}</DescriptionText>
      </RowContainer>
      )}

      <TitleText>Ações</TitleText>

      <ActionContainer>
        <RowContainer justifyContent="center">
          <ButtonAction onClick={() => handleClientDetail()}>
            <AccountCircle />
            Detalhes do cliente
          </ButtonAction>
          <ButtonAction onClick={() => setCreditInputStatus(true)}>
            <AttachMoney />
            Vender produto
          </ButtonAction>
          {
            productStore.product_final_price > 0
            && !productStore.status
            && !productStore.employee_ending_note && (
            <ButtonAction onClick={() => setRatingStatus(true)}>
              <Star />
              Gerar link de avaliação
            </ButtonAction>
            )
}
        </RowContainer>
        <TitleText style={{
          marginTop: 20,
          marginBottom: 5,
          fontSize: 14,
        }}
        >
          Mudar status do produto

        </TitleText>
        <RowContainer justifyContent="center">
          <ButtonAction
            onClick={() => setCloseProductStataus(true)}
            disabled={!productStore.status && !productStore.employee_ending_note}
            bkColor={productStore.status && !productStore.employee_ending_note ? '#edcb23' : '#848484'}
          >
            <Block />
            Finalizar
          </ButtonAction>
          <ButtonAction
            onClick={() => handleCloseProduct(true)}
            disabled={!productStore.status && !productStore.employee_ending_note}
            bkColor={productStore.status && !productStore.employee_ending_note ? '#19e5a8' : '#848484'}
          >
            <CheckCircleOutline />
            Ativar
          </ButtonAction>
        </RowContainer>
      </ActionContainer>

      <Dialog open={creditInputStatus} onClose={() => setCreditInputStatus(false)}>
        <DialogTitle>Finalizar produto</DialogTitle>
        <DialogContent>
          <FormLabel component="legend">Valor negociado</FormLabel>
          <CreditInput
            thousandSeparator
            prefix="R$ "
            onValueChange={(value) => setCreditValue(value.floatValue)}
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
            setCreditValue(0);
          }}
          >
            Cancelar

          </Button>
          <Button color="primary" onClick={() => hadleSaleProduct()}>Vender</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={closeProductStatus} onClose={() => setCloseProductStataus(false)}>
        <DialogTitle>Finalizar produto</DialogTitle>
        <DialogContent>
          <FormLabel component="legend">Nota de fechamento do produto</FormLabel>
          <CloseInput
            value={closedNote}
            onChange={({ target }) => setClosedNote(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setCloseProductStataus(false);
            setClosedNote('');
          }}
          >
            Cancelar

          </Button>
          <Button color="primary" onClick={() => handleCloseProduct(false)}>Finalizar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={ratingStatus} onClose={() => setRatingStatus(false)}>
        <DialogTitle>Avaliar produto produto</DialogTitle>
        <DialogContent>
          <FormLabel component="legend">Copie o link abaixo e envie para o cliente</FormLabel>
          <a href={`http://localhost:3000/rating/product/${productStore.id}`} target="_blank">{`http://localhost:3000/rating/product/${productStore.id}`}</a>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setRatingStatus(false);
          }}
          >
            Fechar

          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
