import styled from 'styled-components';
import InputMask from 'react-number-format';
import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
`;

export const ClientDataContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 20px;
`;

export const RowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
`;

export const TitleText = styled.h3`
  margin-right: 10px;
  color: ${colors.primary};
`;

export const SubtitleText = styled.span`
  color: #39495b;
`;

export const ActionContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 35px;
`;

export const ButtonAction = styled.button`
  background: ${({ bkColor }) => bkColor || colors.primary};
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  font-size: 0.8em;
  font-weight: bold;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.5em;
    margin-right: 5px;
  }
`;

export const CreditInput = styled(InputMask)`
  width: 100%;
  height: 35px;
  margin-top: 20px;
`;
