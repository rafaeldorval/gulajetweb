import styled from 'styled-components';
import colors from '../../styles/colors'

export const HeaderContainer = styled.div`
  width: 100%;
  height: 8%;
  background: ${colors.primary};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 15px;

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    h3 {
      font-size: 0.9rem;
      margin-left: 10px;
      color: #fff;
    }
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;

    svg {
      color: #fff;
      cursor: pointer;
    }
  }
`;
