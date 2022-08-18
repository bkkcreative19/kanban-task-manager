import styled from "styled-components";

export const DropDownContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
  border-radius: 8px;
  position: absolute;
  top: 5rem;
  right: 0.5rem;
  width: 192px;
  z-index: 1000;
  padding: 2em;
`;

export const DropDownOption = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.color};
  &:last-child {
    margin-top: 0.8em;
  }
`;
