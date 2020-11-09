import styled from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  background: ${colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const TitleRating = styled.h3`
  margin-top: 25px;
`;

export const RowContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const LabelText = styled.p`
  text-align: left;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export const RatingInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 5px;
`;

export const RatingText = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  border: none;
  border-radius: 5px;
  padding: 5px;
`;

export const RatingButton = styled.button`

  width: 100%;
  height: 40px;
  border-radius: 5px;
  margin-top: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  font-size: 1.4em;
`;
