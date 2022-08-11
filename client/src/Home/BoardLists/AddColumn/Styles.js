import styled from "styled-components";

export const ColumnAdd = styled.div`
  background: ${({ theme }) => theme.addColumn};
  border-radius: 6px;
  padding: 4.5em;
  text-align: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 280px;
  min-width: 280px;
`;
export const ColumnText = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  color: #828fa3;
`;
