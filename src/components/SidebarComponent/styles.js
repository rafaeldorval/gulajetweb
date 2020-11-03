import styled from 'styled-components';
import colors from '../../styles/colors'

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({justifyContent}) => justifyContent || 'flex-start'};
  margin-top: ${({mt}) => mt || '0px'};
  width: 100%;
  padding: 10px;

  button {
    background: transparent;
    border: none;
    cursor: pointer;

    svg {
      color: #fff;
      cursor: pointer;
    }
  }

  h3{
    color: ${colors.secondary};
  }

  a{
    text-decoration: none;
    color: ${colors.secondary};

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: color 200ms;

    svg{
      color: ${colors.secondary};
      font-size: 30px;
      transition: color 200ms;
    }

    &:hover {
      color: #fff;

      svg{
        color: #fff;
      }
    }
  }
`;

export const HrComponent = styled.div`
  width: 100%;
  border-bottom: 1px solid #fff;
`
