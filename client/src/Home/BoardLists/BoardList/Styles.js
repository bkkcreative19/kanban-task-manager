import styled from "styled-components";

export const List = styled.div`
  width: 280px;
  min-width: 280px;
`;

export const ListHead = styled.div`
  //   position: relative;

  display: flex;
  align-items: center;
`;

export const ListHeadCircle = styled.div`
  height: 15px;
  width: 15px;
  background: ${({ index, color }) =>
    index === 0
      ? "#49C4E5"
      : index === 1
      ? "#8471F2"
      : index === 2
      ? "#67E2AE"
      : color};
  border-radius: 50%;
`;

export const ListHeadText = styled.h3`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 2.4px;
  color: #828fa3;
  text-transform: uppercase;
  margin-left: 1em;
`;
