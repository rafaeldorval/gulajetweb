import styled from "styled-components";

export const RowFileMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const FileActionButton = styled.button`
  background: #0eadf2;
  padding: 5px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #fff;
  }
`;

export const FileDurationText = styled.span`
  color: #fff;
  font-weight: 700;
  font-size: 0.75em;
`;
