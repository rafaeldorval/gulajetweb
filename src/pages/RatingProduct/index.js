import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from 'react-rating';
import { useParams } from 'react-router-dom';
import ProductAction from '../../store/ducks/products';
import {
  Container, LabelText, TitleRating, RatingInput, RowContainer, RatingText, RatingButton,
} from './styles';
import LogoImage from '../../assets/image/logobrancotransparent.png';

export default function RatingProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const ratingFinishStatus = useSelector((store) => store.products.ratingFinish);
  const [ratingData, setRatingData] = useState({
    rating: 0,
    name: '',
    note: '',
  });

  const handleRatingData = (name) => ({ target }) => setRatingData({
    ...ratingData,
    [name]: target.value,
  });

  function handleRatingProduct() {
    if (ratingData.rating === 0 || !ratingData.name || !ratingData.note) {
      return alert('Por favor, preecha todos os campos e tente novamente');
    }

    return dispatch(ProductAction.ratingProductRequest(productId, ratingData));
  }

  return ratingFinishStatus ? (
    <Container>
      <img
        src={LogoImage}
        alt="logo"
        style={{
          maxWidth: '10%',
          height: 'auto',
          marginBottom: 25,
        }}
      />
      <TitleRating>Obrigado por avaliar sua compra</TitleRating>
    </Container>
  ) : (
    <Container>
      <img
        src={LogoImage}
        alt="logo"
        style={{
          maxWidth: '10%',
          height: 'auto',
          marginBottom: 25,
        }}
      />
      <TitleRating>Avalie a sua compra</TitleRating>
      <RowContainer>
        <LabelText>Seu nome</LabelText>
        <RatingInput value={ratingData.name} onChange={handleRatingData('name')} />
      </RowContainer>
      <RowContainer>
        <LabelText>Avaliação</LabelText>
        <Rating
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
          fractions={2}
          initialRating={ratingData.rating}
          onChange={(value) => setRatingData({
            ...ratingData,
            rating: value,
          })}
        />
      </RowContainer>
      <RowContainer>
        <LabelText>Sua experiencia</LabelText>
        <RatingText value={ratingData.note} onChange={handleRatingData('note')} />
      </RowContainer>
      <RowContainer onClick={() => handleRatingProduct()}>
        <RatingButton>Avaliar</RatingButton>
      </RowContainer>
    </Container>
  );
}
