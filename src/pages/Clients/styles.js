import styled from 'styled-components';
import colors from '../../styles/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* height: 100%; */
  width: 100%;
`;

export const PageTitle = styled.h3`
  margin-top: 30px;
  text-transform: uppercase;
  color: ${colors.secondary};
`

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 40px;
  padding: 50px;

  width: 70%;
  height: 35%;
`

export const CardHeader = styled.div`
  height: 150px;
  width: 200px;
  padding: 20px;
  background: ${colors.primary};
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3{
    color: #fff;
    font-size: 2.5em;
    margin-bottom: 20px;
  }

  p{
    color: #fff;
  }
`
