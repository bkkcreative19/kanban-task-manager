import styled from "styled-components";

export const SelectContainer = styled.div`
  width: 100%;
  border: 1px solid rgba(130, 143, 163, 0.25);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1.3em;
  cursor: pointer;
  position: relative;
  margin-top: 1em;
`;

export const SelectText = styled.span`
  font-weight: 500;
  font-size: 13px;
  line-height: 23px;
  color: #000112;
`;

export const SelectDropdown = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: translateY(28%);
  //   bottom: -3.2rem;
  padding: 1.3em;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
  border-radius: 8px;
`;

export const SelectDropdownOption = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 23px;
  color: #828fa3;
  margin-top: 0.7em;
`;
