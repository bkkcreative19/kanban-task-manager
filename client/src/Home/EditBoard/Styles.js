import styled from "styled-components";

export const BoardEdit = styled.div`
  padding: 3em;
`;

export const BoardEditHead = styled.h3`
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: ${({ theme }) => theme.mainText};
`;
export const BoardEditInput = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1.4em 0;
`;
export const BoardEditInputLabel = styled.label`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #828fa3;
  margin-bottom: 0.8em;
`;
export const BoardEditInputField = styled.input`
  padding: 0.5em 1em;
`;
export const BoardEditColumnList = styled.div`
  margin-top: 1em;
`;
export const BoardEditColumnHead = styled.h3`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #828fa3;
`;
export const BoardEditColumnItem = styled.div`
  margin-top: 1em;
  display: flex;
  align-items: center;
`;
export const BoardEditColumnInput = styled.input`
  width: 100%;
  padding: 0.5em 0;
`;
export const BoardEditColumnX = styled.span`
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0 0.8em;
`;

export const AddColumnBtn = styled.button`
  background: rgba(99, 95, 199, 0.1);
  border-radius: 20px;
  width: 100%;
  padding: 0.6em 1.2em;
  font-weight: 700;
  font-size: 13px;
  line-height: 23px;
  color: #635fc7;
  border: none;
  margin-top: 1.3em;
  cursor: pointer;
`;

export const SaveBoard = styled.button`
  background: #635fc7;
  border-radius: 20px;
  border: none;
  margin-top: 1.3em;
  cursor: pointer;
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;
  line-height: 23px;
  width: 100%;
  padding: 0.6em 1.2em;
`;
